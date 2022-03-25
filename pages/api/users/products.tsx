import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  console.log('body: ', req.body)
  const product = await client.product.create({
    data: {
      name: req.body.name,
      price: +req.body.price,
      image: req.body.image || '',
      description: req.body.description,
      user: {
        connect: {
          id: req?.session?.user?.id,
        },
      },
    },
  })
  if (!product) return res.status(404).end()
  //   console.log(product)
  return res.json({
    ok: true,
  })
}

export default withApiSession(withHandler({ method: 'POST', handler }))
