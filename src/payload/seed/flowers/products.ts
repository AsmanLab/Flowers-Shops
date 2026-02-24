import type { Product } from '../../payload-types'

export const floralProducts: Partial<Product>[] = [
    {
        title: 'Lavender Dream',
        slug: 'lavender-dream',
        _status: 'published',
        meta: {
            title: 'Lavender Dream Bouquet',
            description: 'A soothing mix of fresh lavender and eucalyptus.',
            image: '{{MEDIA_ID_1}}',
        },
        layout: [
            {
                blockType: 'content',
                columns: [
                    {
                        size: 'full',
                        richText: [
                            {
                                children: [
                                    {
                                        text: 'Handcrafted with love using the finest lavender stems.',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        title: 'Velvet Rose Arrangement',
        slug: 'velvet-rose',
        _status: 'published',
        meta: {
            title: 'Velvet Rose Arrangement',
            description: 'Classic red roses for a timeless expression of love.',
            image: '{{MEDIA_ID_2}}',
        },
        priceJSON: JSON.stringify([{ quantity: 1, price: 5500 }]),
    },
    {
        title: 'Spring Peony Bliss',
        slug: 'spring-peony-bliss',
        _status: 'published',
        meta: {
            title: 'Spring Peony Bliss',
            description: 'A burst of color with seasonal peonies.',
            image: '{{MEDIA_ID_3}}',
        },
    },
    {
        title: 'Majestic White Lilies',
        slug: 'majestic-white-lilies',
        _status: 'published',
        meta: {
            title: 'Majestic White Lilies',
            description: 'Pure and elegant lilies for any occasion.',
            image: '{{MEDIA_ID_4}}',
        },
    },
    {
        title: 'Urban Jungle Monstera',
        slug: 'urban-jungle-monstera',
        _status: 'published',
        meta: {
            title: 'Urban Jungle Monstera',
            description: 'A statement plant for your indoor space.',
            image: '{{MEDIA_ID_5}}',
        },
    },
    {
        title: 'Ceremony Floral Arch',
        slug: 'ceremony-floral-arch',
        _status: 'published',
        meta: {
            title: 'Ceremony Floral Arch',
            description: 'Bespoke wedding arch arrangements.',
            image: '{{MEDIA_ID_6}}',
        },
    },
    {
        title: 'Midnight Orchids',
        slug: 'midnight-orchids',
        _status: 'published',
        meta: {
            title: 'Midnight Orchids',
            description: 'Exotic dark orchids for a unique touch.',
        },
    },
    {
        title: 'Sun-Kissed Tulips',
        slug: 'sun-kissed-tulips',
        _status: 'published',
        meta: {
            title: 'Sun-Kissed Tulips',
            description: 'Bring the sunshine indoors with these vibrant tulips.',
        },
    },
    {
        title: 'Rustic Daisy Bundle',
        slug: 'rustic-daisy-bundle',
        _status: 'published',
        meta: {
            title: 'Rustic Daisy Bundle',
            description: 'Simple, charming, and perfect for every day.',
        },
    },
    {
        title: 'Emerald Fern Pot',
        slug: 'emerald-fern-pot',
        _status: 'published',
        meta: {
            title: 'Emerald Fern Pot',
            description: 'Lush greenery to freshen up your desk.',
        },
    },
    {
        title: 'Golden Sunflower Vase',
        slug: 'golden-sunflower-vase',
        _status: 'published',
        meta: {
            title: 'Golden Sunflower Vase',
            description: 'Large, bright sunflowers that radiate joy.',
        },
    },
    {
        title: 'Sympathy Lily Box',
        slug: 'sympathy-lily-box',
        _status: 'published',
        meta: {
            title: 'Sympathy Lily Box',
            description: 'A thoughtful tribute for difficult times.',
        },
    },
]
