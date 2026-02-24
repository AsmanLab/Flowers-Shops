# Project Architecture

This project is a full-stack e-commerce application built with **Next.js 13+ (App Router)** and **Payload CMS**, using **MongoDB** as the database.

## System Overview

The application is a monolith containing both the frontend (Next.js) and the backend (Payload CMS) in a single repository.

- **Frontend**: Next.js App Router (`src/app`)
- **Backend/CMS**: Payload CMS (`src/payload`)
- **Database**: MongoDB
- **Styling**: SCSS Modules
- **Language**: TypeScript

## Directory Structure

### `src/payload`
Contains the CMS configuration and backend logic.
- `payload.config.ts`: Main configuration file for Payload.
- `collections/`: Defines data schemas (Products, Orders, Users, Media, Pages, Categories).
- `globals/`: singleton content configs (Header, Footer, Settings).
- `endpoints/`: Custom API endpoints (e.g., Stripe webhooks, seed).

### `src/app`
Contains the Next.js frontend application.
- `(pages)`: Route groups for organization.
- `_components`: Reusable UI components.
- `_css`: Global styles and SCSS variables.
- `_providers`: Context providers (Auth, Theme, Cart).
- `_api`: Frontend API utilities.

## Data Flow

1.  **Content Management**: Admins manage content (Products, Pages) via the Payload Admin Panel (`/admin`).
2.  **API**: Next.js fetches content from Payload via the Local API (server-side) or REST API (client-side).
3.  **Commerce**:
    - **Products**: Managed in Payload.
    - **Cart**: Managed via client-side Context (`CartProvider`).
    - **Checkout**: Stripe integration. Order records created in Payload upon successful payment via Webhooks.

## Key Technologies

- **Payload CMS**: Headless CMS for managing content and auth.
- **Next.js**: React framework for server-side rendering and static generation.
- **MongoDB**: NoSQL database for flexible content storage.
- **Stripe**: Payment processing.
