// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Agent, createInstruction, minify, sequence } from "@hyv/core";
import { DallEModelAdapter, GPTModelAdapter } from "@hyv/openai";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
type Data = Record<string, any>;

const result: Record<string, unknown> = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.clear();

  const {
    data: [term1],
  } = await axios.get("https://random-word-form.herokuapp.com/random/noun");
  const {
    data: [term2],
  } = await axios.get("https://random-word-form.herokuapp.com/random/noun");

  const socialMediaExpert = new Agent(
    new GPTModelAdapter({
      model: "gpt-4",
      systemInstruction: createInstruction(
        minify`social media savant' with a talent for creating humorous, shareable content that captivates online audiences.`,
        minify`
        - You always think.
        - You always reason your thoughts.
        - You always reflect on your reasoning. 
        - Write a random fact tweet.
        - The tweet(length=characterCount) always compares two incomparable terms and finds one better.
        - Reflect on your tweet.
        - Tweet has to be funny
        - Describe one image for the tweet.
        - Images should NEVER INCLUDE LETTERS/WRITINGS/WORDS
        - Add a prompt(imageStyle) for the image!!!
        - Add a fileName for the image
        `,
        {
          id: "random unique 16digit id",
          thought: "detailed string",
          reason: "detailed string",
          reflection: "detailed string",
          summary: "{term1} vs, {term2}",
          tweet:
            "Did you know that {term1} is better than {term2}, because {term1} … and {term2} …? emojis … #hashtags …",
          tweetReflection:
            "Tweet is funny/not funny because …, {aspect1} …, {aspect2}",
          images: [
            {
              prompt: "detailed string",
            },
          ],
          fileName: "xbettery-{fileName}.png",
        }
      ),
    }),
    {
      // @ts-ignore
      before: async (message) => {
        return {
          ...message,
          characterCount: 288,
          imageCount: 1,
          imageStyle:
            "Flat Design: A minimalist approach with solid colors and a focus on simplicity and few colors.",
        };
      },
      after: async (message) => {
        result.message = message;
        return message;
      },
    }
  );

  const illustrator = new Agent(new DallEModelAdapter({ size: "1024x1024" }), {
    sideEffects: [
      {
        prop: "files",
        run: async (files) => {
          res.status(200).json({ ...result, files });
        },
      },
    ],
  });

  sequence(
    {
      comparison: `${term1} is better than ${term2}`,
    },
    [socialMediaExpert, illustrator]
  );
}
