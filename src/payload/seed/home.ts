import type { Page } from '../payload-types'

export const home: Partial<Page> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'GulBerry Boutique',
    description: 'Fresh, premium handcrafted bouquets delivered with love.',
    image: '{{PRODUCT1_IMAGE}}',
  },
  hero: {
    type: 'highImpact',
    richText: [
      {
        children: [
          {
            text: 'GulBerry Boutique',
          },
        ],
        type: 'h1',
      },
      {
        children: [
          {
            text: 'Experience the magic of fresh flowers. From everyday bouquets to bespoke wedding arrangements, we bring nature\'s beauty to your door.',
          },
        ],
        type: 'large-body',
      },
    ],
    links: [
      {
        link: {
          type: 'reference',
          appearance: 'primary',
          reference: {
            relationTo: 'pages',
            value: '{{PRODUCTS_PAGE_ID}}',
          },
          label: 'Shop Now',
          url: '',
        },
      },
    ],
    media: '{{PRODUCT1_IMAGE}}',
  },
  layout: [
    {
      blockName: 'Content Block',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: [
            {
              children: [
                {
                  text: 'Our Services',
                },
              ],
              type: 'h2',
            },
          ],
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Daily Freshness',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: "Every stem is hand-selected each morning to ensure your bouquet stays vibrant and beautiful for as long as possible.",
                },
              ],
            },
          ],
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Wedding & Events',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'We create breathtaking floral arrangements for weddings, corporate events, and special celebrations tailored to your vision.',
                },
              ],
            },
          ],
        },
        {
          size: 'oneThird',
          richText: [
            {
              children: [
                {
                  text: 'Local Delivery',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Reliable same-day delivery across the city. Surprise your loved ones with a fresh delivery of joy.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      blockType: 'mediaBlock',
      blockName: 'Media Block',
      position: 'default',
      media: '{{PRODUCT2_IMAGE}}',
    },
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'Featured Bouquets',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Explore our latest collection of handcrafted arrangements. Filter by category to find the perfect bloom for every occasion.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      categories: [],
    },
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: [
        {
          children: [
            {
              text: 'Make Someone Smile Today',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'Order a custom arrangement or choose from our curated seasonal picks.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'reference',
            url: '',
            label: 'Shop Collection',
            appearance: 'primary',
            reference: {
              value: '{{PRODUCTS_PAGE_ID}}',
              relationTo: 'pages',
            },
          },
        },
      ],
    },
  ],
}
