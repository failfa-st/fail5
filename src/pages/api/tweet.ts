// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Agent, sequence, createInstruction, ModelMessage } from "@hyv/core";
import { GPTModelAdapter, DallEModelAdapter } from "@hyv/openai";

type Data = Record<string, any>;

const result: Record<string, unknown> = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.clear();
  const socialMediaExpert = new Agent(
    new GPTModelAdapter({
      systemInstruction: createInstruction(
        "Social Media Expert",
        `You think, you reason your thoughts, you reflect on your reasoning, you write ABSURD IMMORAL TWEETS about todays headline
        Describe images for the tweet.
        Add a prompt for each image.
        `,
        {
          thought: "string",
          reason: "string",
          reflection: "string",
          tweet: "string",
          images: [
            {
              prompt: "detailed string",
            },
          ],
        }
      ),
    }),
    {
      after: async (message) => {
        result.message = message;
        return message;
      },
    }
  );

  const illustrator = new Agent(new DallEModelAdapter(), {
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
      headline: req.body.question,
      characterLength: 288,
      imageCount: 1,
      writingStyle: "Hipster",
    },
    [socialMediaExpert, illustrator]
  );
}
