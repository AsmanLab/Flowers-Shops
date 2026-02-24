# Project Commands

This project uses `npm` (or `yarn`) for package management and script execution.

## Setup & Installation

### Install Dependencies
```bash
npm install --legacy-peer-deps
```
*Note: `--legacy-peer-deps` is required due to dependency conflicts in the current version.*

### Database Setup
Ensure MongoDB is running locally or provide a URI in `.env`.
To run MongoDB locally with Docker (if available):
```bash
docker-compose up -d mongo
```
Or with Homebrew:
```bash
brew services start mongodb/brew/mongodb-community
```

### Seed Database
Populates the database with initial sample data (products, pages).
```bash
npm run seed
```

## Development

### Start Development Server
Starts both the Payload CMS and Next.js frontend.
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## Webhooks

### Stripe Webhook Listeners
If testing Stripe webhooks locally:
```bash
npm run stripe:webhooks
```

## Building for Production

### Build Payload
```bash
npm run build:payload
```

### Build Next.js
```bash
npm run build:next
```

### Build All
```bash
npm run build
```

## Utilities

### Generate Types
Generates TypeScript interfaces from Payload collections.
```bash
npm run generate:types
```

### Linting
```bash
npm run lint
```
