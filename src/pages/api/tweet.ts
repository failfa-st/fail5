// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Agent, sequence, createInstruction, ModelMessage } from "@hyv/core";
import { GPTModelAdapter } from "@hyv/openai";

type Data = {
  message: ModelMessage;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.clear();
  const socialMediaExpert = new Agent(
    new GPTModelAdapter({
      systemInstruction: createInstruction(
        "Social Media Expert",
        "You think, you reason your thoughts, you reflect on your reasoning, you write immoral tweets about todays headline",
        {
          thought: "string",
          reason: "string",
          reflection: "string",
          tweet: "string",
        }
      ),
    })
  );
  const tweeter = new Agent(
    new GPTModelAdapter({
      systemInstruction: createInstruction(
        "Social Media Expert",
        "You think, you reason your thoughts, you reflect on your reasoning, you ADD EMOJIS",
        {
          thought: "string",
          reason: "string",
          reflection: "string",
          originalTweet: "originalTweet",
          tweet: "tweet ++<=3 EMOJIS ",
        }
      ),
    }),
    {
      //@ts-ignore
      before: async (message) => {
        return { originalTweet: message.tweet } as ModelMessage;
      },
      after: async (message) => {
        return { message };
      },
      sideEffects: [
        {
          prop: "message",
          run: async (message: { message: ModelMessage }) => {
            res.status(200).json({ message });
          },
        },
      ],
    }
  );

  sequence(
    {
      headline: req.body.question,
      characterLength: 288,
      writingStyle: "Hipster",
    },
    [socialMediaExpert, tweeter]
  );
}
