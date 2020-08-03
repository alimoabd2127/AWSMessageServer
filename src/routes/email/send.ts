import config from '@/logger.json'
import { sendEmail, verifyModelMiddleware } from '@/utils'
import Joi from 'joi'
import Router from 'koa-router'

const schema = Joi.object({
  message: Joi.string().required()
})

export default async (router: Router): Promise<void> => {
  router.post('/send', verifyModelMiddleware(schema), async (ctx) => {
    sendToEmailSubscribers(ctx.request.body.message)
    ctx.response.status = 200
  })
}

function sendToEmailSubscribers(message: string) {
  const source = config.email.source
  const to = config.email.to
  const replyTo = config.email.replyTo as string[]
  sendEmail(source, to, replyTo, message)
}
