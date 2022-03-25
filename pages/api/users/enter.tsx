import mail from '@sendgrid/mail'
import twilio from 'twilio'
import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@libs/server/withHandler'
import client from '@libs/server/client'

mail.setApiKey(process.env.SNEDGRID_KEY!)
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body

  const removeFirstZero = (phoneNumber: string): string => {
    if (phoneNumber.charAt(0) === '0') return phone.slice(1)
    return phoneNumber
  }
  const phoneWithoutZero = removeFirstZero(phone)
  const user = phone ? { phone: phoneWithoutZero } : email ? { email } : null
  if (!user) return res.status(400).json({ ok: false })
  const payload = Math.floor(100000 + Math.random() * 900000) + ''
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: 'Anonymous',
            ...user,
          },
        },
      },
    },
  })

  console.log('token result: ', token)

  if (phoneWithoutZero) {
    /*  const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: '+82' + phoneWithoutZero,
      // to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    })
    console.log(message) */
  } else if (email) {
    /* const sendGridEmail = await mail.send({
      from: 'nsgr12@gmail.com',
      to: email,
      subject: 'Your Carrot Market Verification Email',
      text: `Your Token is ${payload}`,
      html: `<strong>Your Token is ${payload}</strong>`,
    })
    console.log('sendGridEmail: ', sendGridEmail)*/
  }
  return res.json({
    ok: true,
  })
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false })
