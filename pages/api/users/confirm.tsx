import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
    }
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  console.log('req.settion: ', req.session)
  const { token } = req.body
  console.log('confirm token: ', token)
  const exist = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true },
  })
  console.log('exist: ', exist)

  if (!exist) return res.status(404).end()

  console.log(exist)
  req.session.user = {
    id: exist.userId,
  }
  //  알아서 암호화 하고 browser cookie에 저장한다.
  await req.session.save()
  res.status(200).end()
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsession',
  password:
    '3948194702981347081273958734205107sdfkjhuvhoiuzxchvizuxhcvluzhxuvhuieiuoryoauwerl',
})
