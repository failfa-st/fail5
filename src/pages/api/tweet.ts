// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Agent,
  sequence,
  createInstruction,
  ModelMessage,
  minify,
} from "@hyv/core";
import { GPTModelAdapter, DallEModelAdapter } from "@hyv/openai";
import axios from "axios";
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
        "Social Media Expert",
        minify`You always think, you always reason your thoughts, you always reflect on your reasoning. 
        - Write a random fact tweet.
        - The tweet(length=characterCount) always compare two incomparable terms and finds one better.
        Describe one image for the tweet.
        Add a prompt(imageStyle) for the image!!!
        `,
        {
          thought: "string",
          reason: "detailed string",
          reflection: "string",
          tweet:
            "Did you know {term1} is better than {term2}, because …? #hashtags …",
          images: [
            {
              prompt: "detailed string",
            },
          ],
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
          imageStyle: "flat illustration, bold colors, simple shapes",
        };
      },
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

  // const consumerKey = "YOUR_CONSUMER_KEY";
  // const consumerSecret = "YOUR_CONSUMER_SECRET";
  // const bearerToken = "YOUR_BEARER_TOKEN";

  // axios
  //   .get("https://api.twitter.com/1.1/trends/place.json?id=23424977", {
  //     headers: {
  //       Authorization: `Bearer ${bearerToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     const trends = response.data[0].trends;
  //     const hashtags = trends.filter((trend) => trend.name.startsWith("#"));
  //     const trendingHashtags = hashtags.map((hashtag) => hashtag.name);
  //     console.log(trendingHashtags);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  sequence(
    {
      comparison: `${term1} is better than ${term2}`,
    },
    [socialMediaExpert, illustrator]
  );
}
