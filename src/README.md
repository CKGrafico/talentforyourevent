# Talent for your Event main website

We are using [Nuxt 3](https://v3.nuxtjs.org) with GitHub authentication.

## Setup

Make sure to install the dependencies

```bash
yarn install
```

And copy the `.env.example` to `.env`

```bash
cp .env.example .env
```

### GitHub

[Create a GitHub OAuth application](https://github.com/settings/applications/new) and make sure to set:

- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/github/callback

Fill your `.env` with `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` variables.

### Database

Fill your `.env` with `DATABASE_URL` variable with a connection string like `"sqlserver://_____.database.windows.net:1433;database=_____;user=_____;password=_____;encrypt=true"`.

```bash
npx prisma db push
```

```bash
npx prisma db seed
```

## Development

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```
