# PullMeText Deployment Guide

This guide walks you through setting up, running, and deploying the **PullMeText** application. Even if you have no prior experience with web development, follow these steps closely and you’ll have a working app live on the internet.

## 📦 1. Prepare your development environment

### Install Node.js and npm

PullMeText runs on **Node.js**. You need Node.js (which includes npm) installed on your computer. To check if you already have it, open a terminal or command prompt and run:

```
node -v
npm -v
```

If you see version numbers, Node.js is installed. If not, download it:

1. Visit nodejs.org and download the **LTS** version (recommended for most users).
2. Run the installer and follow the prompts.
3. After installation, reopen your terminal and re-run `node -v` and `npm -v` to verify.

### Install Git

Git lets you manage your code and push it to GitHub. Install Git from git-scm.com if it’s not already installed. After installation, check with:

```
git --version
```

## 🗂️ 2. Unzip the project

1. Download `pullmetext.zip` from the previous message (if you haven’t already).
2. Extract it to a location on your computer, e.g. `Documents/pullmetext`.

Your folder structure should look like this:

```
pullmetext/
|— package.json
|— next.config.js
|— tailwind.config.js
|— prisma/
|— app/
|— ...
```

## 🛠️ 3. Install dependencies

Open a terminal **inside** the `pullmetext` directory. You can cd into it:

```
cd path/to/pullmetext
npm install
```

`npm install` reads the `package.json` and downloads the necessary libraries (Next.js, React, Tailwind CSS, etc.). This may take a few minutes.

## 🔐 4. Configure environment variables

The app needs an API key for OpenAI. You set this in a file called `.env.local`.

1. Copy the example file:

```
cp .env.example .env.local
```

2. Open `.env.local` in your editor. Replace `your_openai_api_key_here` with your real OpenAI API key. To get an API key:
   - Sign up at platform.openai.com and navigate to **API Keys**.
   - Create a new secret key and copy it. **Keep it private!**
   - Paste it into `.env.local` like so:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
```

3. You can leave other variables (DATABASE_URL, Stripe, NextAuth) unchanged for now unless you plan to use them later.

## 🚀 5. Run the app locally

To see the app running on your machine, execute:

```
npm run dev
```

The server will start and display a local URL, usually `http://localhost:3000`. Open that URL in your web browser. You should see the PullMeText interface. Paste some AI-generated text, choose a tone, and click **Humanize Text**. The app will send your text to OpenAI and return a humanized version.

## 🌐 6. Push the code to GitHub

Having your code in GitHub makes it easy to deploy and collaborate.

1. Create a new repository on GitHub (e.g. `pullmetext`). Do **not** add a README or .gitignore when creating the repo since they’re already included.
2. In your terminal (still in the `pullmetext` folder), run:

```
git init
git add .
git commit -m "Initial commit of PullMeText app"
git branch -M main
git remote add origin https://github.com/yourusername/pullmetext.git
git push -u origin main
```

Replace `yourusername` with your GitHub username.

## ☁️ 7. Deploy to Vercel

Vercel provides effortless hosting for Next.js apps.

1. Sign up at vercel.com if you don’t already have an account.
2. In the Vercel dashboard, click **Add New → Project**.
3. Connect your GitHub account if prompted and select the `pullmetext` repository.
4. When asked for environment variables, set `OPENAI_API_KEY` to the same value you used in `.env.local`. Add other variables later if needed.
5. Leave build settings at defaults; Vercel will detect this is a Next.js project.
6. Click **Deploy**. Vercel will build the app and host it at a URL like `https://pullmetext.vercel.app`.

### After deployment

Visit your Vercel URL and verify the app works. If you see errors, check:

* **Environment variables** – Make sure `OPENAI_API_KEY` is present and correct in Vercel settings.
* **OpenAI usage limits** – Free API keys have quotas; if you get errors, check your usage in your OpenAI dashboard.

## 💡 8. Next steps and monetization

Now that you have a live MVP, here are areas to focus on next:

1. **Add user accounts** – Integrate NextAuth.js with email login or OAuth (Google) so users can save and track their conversions.
2. **Limit free usage** – Track the number of conversions per day for non-pro users (server-side with a database or client-side with local storage).
3. **Stripe integration** – Use Stripe to sell subscriptions or credits. Create price plans in Stripe, then add checkout routes in your code. Store subscription status in your database (`isPro` in the Prisma schema).
4. **Marketing** – Create TikTok/Instagram videos demonstrating the transformation. Encourage users to share their before/after results. Use referral bonuses to increase sign-ups.

Feel free to ask for help implementing any of these features. You’re on your way to building products that can scale into a real business.