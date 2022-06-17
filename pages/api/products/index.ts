import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === 'GET') {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    })
    if (!products) return res.status(404).end()
    return res.json({ ok: true, products })
  }
  if (req.method === 'POST') {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req

    const product = await client.product.create({
      data: {
        name: name,
        price: +price,
        image: photoId,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })
    if (!product) return res.status(404).end()
    return res.json({
      ok: true,
      product,
    })
  }
}

export default withApiSession(
  withHandler({ methods: ['GET', 'POST'], handler }),
)
