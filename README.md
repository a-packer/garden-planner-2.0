This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend - PocketBase
start the backend of the application by running 
``` ./pocketbase serve ```
[http://127.0.0.1:8090] - if pb_public directory exists, serves the static content from it (html, css, images, etc.)
[http://127.0.0.1:8090/_/] - superusers dashboard
[http://127.0.0.1:8090/api/] - REST-ish API
You could find all available commands and their options by running ./pocketbase --help or ./pocketbase [command] --help


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
