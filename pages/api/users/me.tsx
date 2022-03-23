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
  console.log('me: ', req.session)
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  })
  return res.json({
    ok: true,
    profile,
  })
}

export default withIronSessionApiRoute(withHandler('GET', handler), {
  cookieName: 'carrotsession',
  password:
    '3948194702981347081273958734205107sdfkjhuvhoiuzxchvizuxhcvluzhxuvhuieiuoryoauwerl',
})
