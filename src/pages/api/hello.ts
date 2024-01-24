import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/pages/lib";
// import Pet from "../../../models/Pet";
import  Survey  from "../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect().then((log)=>{console.info("Connected to MongoDb DataBase ")})

  switch (method) {
    case "POST":
      try {
        const survey = await Survey.create(
          req.body,
        ); 
        res.status(201).json({ success: true, data: survey });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(404).json({ success: false });
      break;
  }
}