# fail5

fail5 is a Next.js project that generates humorous tweets using OpenAI's GPT-4 API and Agent chaining using Hyv.

![x-better-y ui](/public/x-better-y-ui.png)

We AI generate funny tweets you can find on twitter:

> [x better y](https://twitter.com/XbetterY)

## Getting Started

To get started follow these steps:

1. Copy the `.env.local.example` file and rename it to `.env.local`
2. Insert your OpenAI API key into the `OPENAI_API_KEY` variable in the .env.local file.
3. Run `npm i` to install the project dependencies.
4. Run `npm run dev`

That´s it.

## Don't have GPT-4 Access yet?

Go to `/src/pages/api/x-better-y.ts` and change the model.
