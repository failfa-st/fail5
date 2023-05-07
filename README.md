<h1 align="center"><big>fail5</big></h1>

<p align="center"><img src="public/logo.png" alt="logo" width="200"/></p>

> This project is built to fail  
> (until it doesn't)  
> Restart until it is good enough

# Tweet Generator

fail5 is a Next.js project that generates humorous tweets using OpenAI's GPT-4 API, DALL-E and Agent chaining using [Hyv](https://github.com/failfa-st/hyv).

![x-better-y ui](/public/x-better-y-ui.png)

We use AI to generate funny tweets you can find on twitter:

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

## The Hyv

1. Two random words from https://random-word-form.herokuapp.com/ API
2. Social media savant' with a talent for creating humorous, shareable content that captivates online audiences.
3. Illustrator specialized on Flat Design: A minimalist approach with solid colors and a focus on simplicity and few colors.
