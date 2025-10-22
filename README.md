# PullMeText

PullMeText is a simple web application that rewrites AI‑generated text to sound more human. Paste any machine‑written content, pick a tone, and get a version that reads naturally to real people. Built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

* **Humanize AI text** – Choose a tone (Casual, Friendly, Sarcastic, Professional) and submit your AI‑generated text. The app calls OpenAI’s Chat Completion API to rewrite the text with your selected tone.
* **Fast UI** – Clean, responsive layout built with Tailwind CSS.
* **Extensible architecture** – Ready for you to add sign‑in, database persistence, premium tiers, rate limiting and more.

## Getting started

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Copy `.env.example` to `.env.local` and fill in your keys. At minimum you need to provide `OPENAI_API_KEY`. If you plan to add authentication, database or Stripe billing, set the corresponding variables as well.

```bash
cp .env.example .env.local
# then edit .env.local
```

3. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Deployment

This project is ready to deploy to Vercel, Netlify or any Node hosting platform. When deploying to Vercel:

1. Import the repository into Vercel.
2. Set environment variables in the Vercel dashboard (at least `OPENAI_API_KEY`).
3. Deploy.

You can customize the appearance by modifying `tailwind.config.js` and extending the components.

## Notes on further development

* **User accounts & premium features** – You can integrate NextAuth.js and Prisma to add login and store user conversions. Connect Stripe to manage subscriptions or credit packs. The Prisma schema is included under `prisma/schema.prisma` as a starting point.
* **Rate limiting** – For free users, implement logic to track the number of conversions per day and restrict usage. This could be done client‑side or server‑side with a database.
* **Analytics & marketing** – Add Google Analytics or PostHog to measure usage. For viral growth, include watermarking and sharing features to TikTok or Instagram.

Feel free to modify the code to suit your needs. Contributions and suggestions are welcome!