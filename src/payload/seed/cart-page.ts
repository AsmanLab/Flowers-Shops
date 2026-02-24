import type { Page } from '../payload-types'

export const cartPage: Partial<Page> = {
  title: 'Cart',
  slug: 'cart',
  _status: 'published',
  meta: {
    title: 'Your Floral Cart | Elle Flowers',
    description: 'Review your selection of premium handcrafted bouquets and indoor plants before checkout.',
  },
  hero: {
    type: 'lowImpact',
    links: [],
    media: '',
    richText: [
      {
        type: 'h1',
        children: [
          {
            text: 'Your Cart',
          },
        ],
      },
      {
        type: 'p',
        children: [
          {
            text: 'Review your selected blooms below. Your cart is saved so you can continue exploring our collections and come back anytime.',
          },
        ],
      },
    ],
  },
  layout: [
    {
      blockType: 'content',
      columns: [
        {
          size: 'twoThirds',
          link: {
            type: 'reference',
            url: '',
            reference: null,
            label: '',
          },
          richText: [
            {
              children: [
                {
                  text: 'Complete the Look',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Did you know you can add a personalized message card or special gift wrapping at checkout? Make your gift even more memorable with our premium finishing touches.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      richText: [
        {
          children: [
            {
              text: 'Looking for something else?',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: 'Continue browsing our seasonal favorites and find the perfect addition to your order.',
            },
          ],
        },
      ],
      links: [
        {
          link: {
            type: 'reference',
            url: '',
            label: 'Continue Shopping',
            appearance: 'primary',
            reference: {
              value: '{{PRODUCTS_PAGE_ID}}',
              relationTo: 'pages',
            },
          },
        },
      ],
      blockName: 'CTA',
      blockType: 'cta',
    },
  ],
}
