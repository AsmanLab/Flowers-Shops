import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { cartPage } from './cart-page'
import { home } from './home'
import { floralMedia } from './flowers/media'
import { categories as floralCategories } from './flowers/categories'
import { floralProducts } from './flowers/products'
import { productsPage } from './products-page'

const collections = ['categories', 'media', 'pages', 'products']
const globals = ['header', 'settings', 'footer']

export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database with Elle Flowers data...')

  // Clear existing media
  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    // Using rmSync (recursive: true replaces deprecated rmdirSync)
    fs.rmSync(mediaDir, { recursive: true, force: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // Clear collections and globals
  await Promise.all([
    ...collections.map(async collection =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ),
    ...globals.map(async global =>
      payload.updateGlobal({
        slug: global as 'header',
        data: {},
      }),
    ),
  ])

  payload.logger.info(`— Seeding all floral media...`)

  // Seed all 6 floral media items, rotating through physical image files
  const seededMedia = await Promise.all(
    floralMedia.map(async (mediaData, index) => {
      // Rotate through image-1.jpg, image-2.jpg, image-3.jpg
      const imageNum = (index % 3) + 1
      const imageFile = `image-${imageNum}.jpg`

      return payload.create({
        collection: 'media',
        filePath: path.resolve(__dirname, imageFile),
        data: mediaData as any,
      })
    })
  )

  const mediaIDs = seededMedia.map(doc => doc.id)

  // Convenient refs for standard images (though we now have a full list)
  const image1ID = mediaIDs[0]
  const image2ID = mediaIDs[1]
  const image3ID = mediaIDs[2]

  payload.logger.info(`— Seeding floral categories...`)

  const createdCategories = await Promise.all(
    floralCategories.map(category =>
      payload.create({
        collection: 'categories',
        data: category as any,
      }),
    ),
  )

  // Category mapping helpers
  const getCategory = (title: string) => createdCategories.find(c => c.title === title) || createdCategories[0]

  const categoriesMap = {
    bouquets: getCategory('Fresh Bouquets'),
    plants: getCategory('Indoor Plants'),
    wedding: getCategory('Wedding Collection'),
    sympathy: getCategory('Sympathy & Funeral'),
    birthday: getCategory('Birthday Special'),
    seasonal: getCategory('Seasonal Picks'),
    corporate: getCategory('Corporate Gifting'),
    dried: getCategory('Dried Flowers'),
  }

  payload.logger.info(`— Seeding floral products...`)

  const createdProducts = []

  // Create products sequentially to maintain order and handle dynamic replacements
  for (let i = 0; i < floralProducts.length; i++) {
    const productData = floralProducts[i]
    let categoryToUse = categoriesMap.bouquets.id
    let imageToUse = image1ID

    const slug = productData.slug || ''

    // Robust keyword-based category assignment
    if (slug.includes('plant') || slug.includes('monstera') || slug.includes('fern')) {
      categoryToUse = categoriesMap.plants.id
      imageToUse = mediaIDs[4 % mediaIDs.length] // Monstera image
    } else if (slug.includes('wedding') || slug.includes('arch')) {
      categoryToUse = categoriesMap.wedding.id
      imageToUse = mediaIDs[5 % mediaIDs.length] // Wedding arch image
    } else if (slug.includes('lily') || slug.includes('sympathy')) {
      categoryToUse = categoriesMap.sympathy.id
      imageToUse = mediaIDs[3 % mediaIDs.length] // White lily image
    } else if (slug.includes('tulip') || slug.includes('peony')) {
      categoryToUse = categoriesMap.seasonal.id
      imageToUse = mediaIDs[2 % mediaIDs.length] // Spring peony image
    } else if (slug.includes('rose')) {
      imageToUse = mediaIDs[1 % mediaIDs.length] // Velvet rose image
    }

    // Replace all MEDIA_ID_X placeholders (1-6) and the PRODUCT_IMAGE placeholder
    let productString = JSON.stringify({ ...productData, categories: [categoryToUse as any] })

    mediaIDs.forEach((id, index) => {
      const placeholder = `{{MEDIA_ID_${index + 1}}}`
      productString = productString.replace(new RegExp(`"${placeholder}"`, 'g'), `"${id.toString()}"`)
    })

    productString = productString.replace(/"\{\{PRODUCT_IMAGE\}\}"/g, `"${imageToUse.toString()}"`)

    const productDoc = await payload.create({
      collection: 'products',
      data: JSON.parse(productString) as any,
    })

    createdProducts.push(productDoc)
  }

  // Update related products (circular references for showcase)
  await Promise.all(
    createdProducts.map((product, index) => {
      const nextProduct = createdProducts[(index + 1) % createdProducts.length]
      const prevProduct = createdProducts[(index - 1 + createdProducts.length) % createdProducts.length]

      return payload.update({
        collection: 'products',
        id: product.id,
        data: {
          relatedProducts: [nextProduct.id as any, prevProduct.id as any],
        },
      })
    })
  )

  payload.logger.info(`— Seeding products page...`)

  const productsPageDoc = await payload.create({
    collection: 'pages',
    data: productsPage as any,
  })

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{PRODUCT1_IMAGE\}\}"/g, `"${image1ID.toString()}"`)
        .replace(/"\{\{PRODUCT2_IMAGE\}\}"/g, `"${image2ID.toString()}"`)
        .replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, `"${productsPageDoc.id.toString()}"`) as any,
    ),
  })

  payload.logger.info(`— Seeding cart page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(cartPage).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, `"${productsPageDoc.id.toString()}"`),
    ) as any,
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      productsPage: productsPageDoc.id as any,
    } as any,
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: productsPageDoc.id as any,
            },
            label: 'Shop Collections',
          },
        },
      ] as any,
    } as any,
  })

  payload.logger.info('Seeded database successfully with Elle Flowers dummy data!')
}
