import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { getBlogPostPreviews } from "@/utils/lib";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await getServerSession(req, res, authOptions);

  if (session && req.method === "GET") {
    res.json(await getBlogPostPreviews());
    // res.send({
    //   content:
    //     "This is protected content. You can access this content because you are signed in.",
    // });
  } else {
    res.redirect("/");
  }
}
