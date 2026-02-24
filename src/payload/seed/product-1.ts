import type { Product } from '../payload-types'

export const product1: Partial<Product> = {
  title: 'Lavender Dream Bouquet',
  stripeProductID: '',
  slug: 'lavender-dream',
  _status: 'published',
  meta: {
    title: 'Lavender Dream Bouquet',
    description: 'A premium handcrafted bouquet of fresh lavender and seasonal greens.',
    image: '{{PRODUCT_IMAGE}}',
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          richText: [
            {
              children: [
                {
                  text: "This content is completely dynamic using custom layout building blocks configured in the CMS. This can be anything you'd like from rich text and images, to highly designed, complex components.",
                },
              ],
            },
          ],
          link: {
            reference: null,
            url: '',
            label: '',
          },
        },
      ],
    },
  ],
  relatedProducts: [], // this is populated by the seed script
}
