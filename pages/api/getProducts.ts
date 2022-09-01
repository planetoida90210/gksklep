import type { NextApiRequest, NextApiResponse } from "next";
import { groq } from "next-sanity";
import { sanityClient } from "../../sanity";


type Data = {
  products: Product[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products: Product[] = await sanityClient.fetch(query);
  res.status(200).json({products});
}