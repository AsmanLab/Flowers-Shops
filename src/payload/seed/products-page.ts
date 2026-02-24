import type { Page } from '../payload-types'

export const productsPage: Omit<Page, 'updatedAt' | 'createdAt' | 'id'> = {
  title: 'Products',
  slug: 'products',
  _status: 'published',
  meta: {
    title: 'GulBerry | All Collections',
    description: 'Explore our full range of handcrafted bouquets, indoor plants, and bespoke floral arrangements.',
  },
  hero: {
    type: 'lowImpact',
    media: null,
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'All Collections',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Browse through our seasonal selections and timeless classics. From vibrant birthday surprises to elegant sympathy tributes, find the perfect blooms for every story.',
          },
        ],
      },
    ],
  },
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'Explore Botanical Excellence',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'Our arrangements are carefully curated by master florists using only the freshest stems. Filter by occasion or plant type to discover your next favorite piece.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      limit: 12,
      categories: [],
    },
  ],
}
