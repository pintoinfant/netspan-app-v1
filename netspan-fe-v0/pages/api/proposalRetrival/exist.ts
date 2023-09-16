import { db } from '@/utilities/mongo';

export default async function read(req: any, res: any) {
  if (req.method === 'GET') {
    const proposals = await db
      .collection('tcr-registry')
      .find(
        {
          event: 'NewEntry',
        },
        {
          _id: 1,
          args: 1,
        },
      )
      .toArray();

    res.status(200).json({ success: true, proposals });
  } else {
    // Handle any other HTTP method
  }
}
