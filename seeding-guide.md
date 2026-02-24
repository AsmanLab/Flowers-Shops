# How to Seed Your Floral Shop Data

To replace the legacy electronics data with the new **Elle Flowers** dummy data, follow these steps:

## Step 1: Run the Seed Command

Open your terminal in the project root and run:

```bash
npm run seed
```

This command will:
- Clear your local MongoDB database.
- Remove old media files.
- Re-populate everything with the expanded floral categories and 12+ premium products.

---

## Step 2: Verify the Changes

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```
2. **Access the Admin Panel**:
   Go to [http://localhost:3000/admin](http://localhost:3000/admin) and log in.
3. **Check Collections**:
   - Go to **Products** – You should see 12+ flower items (Lavender Dream, Velvet Rose, etc.).
   - Go to **Categories** – You should see 8 floral categories.

---

## Troubleshooting

- **"yarn: command not found"**: If you see this in the logs, don't worry. The script is designed to work with both `yarn` and `npm`.
- **Database Connection Error**: Ensure your local MongoDB instance is running.
- **Empty Media**: If images don't appear immediately, the seed script will re-link them. Ensure `image-1.jpg`, `image-2.jpg`, and `image-3.jpg` exist in `src/payload/seed/`.

---

## Customizing the Data

If you want to add more flowers or change categories, edit the files in:
`src/payload/seed/flowers/`
