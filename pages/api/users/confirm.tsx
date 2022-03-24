import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'
import { withApiSession } from '@libs/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  console.log('req.settion: ', req.session)
  const { token } = req.body
  console.log('confirm token: ', token)
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true },
  })
  console.log('foundToken: ', foundToken)

  if (!foundToken) return res.status(404).end()

  console.log(foundToken)
  req.session.user = {
    id: foundToken.userId,
  }
  //  알아서 암호화 하고 browser cookie에 저장한다.
  await req.session.save()
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  })
  return res.json({ ok: true })
}

export default withApiSession(withHandler({ method: 'POST', handler }))
