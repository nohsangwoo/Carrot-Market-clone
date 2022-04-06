import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { name, price, description },
    } = req
    console.log('activate stream post!')
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
        },
      )
    ).json()
    const stream = await client.stream.create({
      data: {
        cloudflareId: uid,
        cloudflareKey: streamKey,
        cloudflareUrl: url,
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    res.json({ ok: true, stream })
  } else if (req.method === 'GET') {
    const {
      query: { page },
    } = req
    console.log('query: ', page)
    const streams = await client.stream.findMany({
      take: 10,
      skip: +page,
    })
    res.json({ ok: true, streams })
  }
}

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
  }),
)
