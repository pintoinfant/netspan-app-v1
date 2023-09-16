import { db } from "@/utilities/mongo";
import { numberToHex } from "viem";

export default async function read(req: any, res: any) {
  if (req.method === "GET") {
    let proposalId = req.query.proposalId;
    console.log(proposalId);
    proposalId = numberToHex(proposalId);
    const proposal = await db
      .collection("tcr-registry")
      .findOne({
        args: {
          "$in": [
            { "_hex": proposalId, "_isBigNumber": true }
          ]
        },
        "event": "ProposalCreated"
      });
    const votes = await db
      .collection("tcr-registry")
      .find({
        args: {
          "$in": [
            { "_hex": proposalId, "_isBigNumber": true }
          ]
        },
        "event": "VoteCast"
      }).toArray()

    // .findOne(where);

    res.status(200).json({ success: true, proposal, votes });
  } else {
    // Handle any other HTTP method
  }
}
