# !!!!!! WIP !!!!!!

# Twitch Clone

## Commands

npx prisma db push
npx prisma generate
npx prisma studio
npx prisma migrate reset

## Environment Variables

### Definitions

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` -> Clerk Publishable Key
- `CLERK_SECRET_KEY`-> Clerk Secret Key
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`-> Clerk Sign In Url e.g /login
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`-> Clerk Sign Up Url e.g /register
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`-> Clerk After Sign In Url e.g /dashboard
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`-> Clerk After Sign Up Url e.g /dashboard
- `CLERK_WEBHOOK_SECRET` -> Clerk webhook secret
- `DATABASE_URL` -> Database Url

### Sample .env file

```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
CLERK_WEBHOOK_SECRET=
```

# Ngrok

To run ngrok in the terminal, run the following command:

`ngrok http --domain=$DOMAIN 3000`

make sure to replace the domain with your domain name.
