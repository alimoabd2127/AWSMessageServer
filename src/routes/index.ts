import email from '@/routes/email'
import sms from '@/routes/sms'
import koa from 'koa'

export default (app: koa<koa.DefaultState, koa.DefaultContext>): void => {
  app.use(email.routes())
  app.use(email.allowedMethods())
  app.use(sms.routes())
  app.use(sms.allowedMethods())
}
