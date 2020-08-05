import config from '@/config.json'
import { sendSMS, verifyModelMiddleware } from '@/utils'
import Joi from 'joi'
import Router from 'koa-router'

const schema = Joi.object({
  message: Joi.string().required()
})

export default async (router: Router): Promise<void> => {
  router.post('/send', verifyModelMiddleware(schema), async (ctx) => {
    sendToSMSSubscribers(ctx.request.body.message)
    ctx.response.status = 200
  })
}

function sendToSMSSubscribers(message: string) {
  const to = config.sms.to
  sendSMS(message, to)
}
