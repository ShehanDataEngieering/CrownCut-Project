<p align="center">
  <a href="https://www.medusajs.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
      <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg" width=100>
    </picture>
  </a>
  <a href="https://railway.app/template/gkU-27?referralCode=-Yg50p">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://railway.app/brand/logo-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://railway.app/brand/logo-dark.svg">
      <img alt="Railway logo" src="https://railway.app/brand/logo-light.svg" width=100>
    </picture>
  </a>
</p>

<h2 align="center">
  Prebaked medusajs 2.0 monorepo
</h2>


## What's included (custom functionality)
- **Multi-country support**: Storefront routes and pricing are ready for country-specific browsing using the Medusa region and country setup.
- **Postgres database**: Connected and configured for the Medusa backend with Railway-provided `DATABASE_URL`.
- **Medusa admin integration**: Admin UI is bundled with the backend and available at `http://localhost:9000/app` in development.
- **Railway hosting**: Backend, storefront, and dependent services are wired for Railway deploys.

# Backend

### local setup
- `cd backend/`
- `pnpm install` or `npm i`
- Rename `.env.template` ->  `.env`
- To connect to your online database from your local machine, copy the `DATABASE_URL` value auto-generated on Railway and add it to your `.env` file.
  - If connecting to a new database, for example a local one, run `pnpm ib` or `npm run ib` to seed the database.
- `pnpm dev` or `npm run dev`

### multi-country setup notes
- Configure regions and countries in the Medusa admin.
- Ensure `DEFAULT_REGION_ID` and `NEXT_PUBLIC_DEFAULT_REGION` are set when using the storefront (see the storefront env template).

### requirements
- **postgres database** (Automatic setup when using the Railway template)
- **redis** (Automatic setup when using the Railway template) - fallback to simulated redis.
- **MinIO storage** (Automatic setup when using the Railway template) - fallback to local storage.
- **Meilisearch** (Automatic setup when using the Railway template)

### commands

`cd backend/`
`npm run ib` or `pnpm ib` will initialize the backend by running migrations and seed the database with required system data.
`npm run dev` or `pnpm dev` will start the backend (and admin dashboard frontend on `localhost:9000/app`) in development mode.
`pnpm build && pnpm start` will compile the project and run from compiled source. This can be useful for reproducing issues on your cloud instance.

# Storefront

### local setup
- `cd storefront/
- Install dependencies `npm i` or `pnpm i`
- Rename `.env.local.template` ->  `.env.local`

### multi-country routing
- Storefront routes use the `[countryCode]` segment.
- The default country is taken from the environment variables and redirects to the appropriate country route when missing.

## Railway deployment
- Use the Railway template link at the top of this README for one-click deploy.
- Railway provisions Postgres, Redis, MinIO, and MeiliSearch automatically.
- After deploy, update environment variables for the backend and storefront as needed (database URL, admin secrets, and public storefront settings).

### requirements
- A running backend on port 9000 is required to fetch product data and other information needed to build Next.js pages.

### commands
`cd storefront/`
`npm run dev` or `pnpm dev` will run the storefront on uncompiled code, with hot-reloading as files are saved with changes.

