# Floral Dummy Data

This folder contains a dedicated set of dummy data for the **Elle Flowers** boutique. It is designed to facilitate comprehensive testing of product filtering, search, and categorization.

## Contents

- `categories.ts`: Expanded list of 8 floral categories.
- `media.ts`: Metadata for floral images (intended to be linked with physical images in the `media` folder).
- `products.ts`: A collection of 12+ premium floral products with varying categories and metadata.

## How to Use

To use this data in your seeding script (`src/payload/seed/index.ts`), you can import these collections and iterate through them:

```typescript
import { categories as floralCategories } from './flowers/categories'
import { floralProducts } from './flowers/products'

// Example usage in the seed function:
const createdCategories = await Promise.all(
  floralCategories.map(category => payload.create({
    collection: 'categories',
    data: category
  }))
)

const createdProducts = await Promise.all(
  floralProducts.map((product, index) => payload.create({
    collection: 'products',
    data: {
      ...product,
      // Link to categories or media as needed
    }
  }))
)
```

This modular structure keeps your main seeding script clean while providing a large dataset for development and testing.
