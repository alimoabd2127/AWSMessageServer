import register from '@/routes/sms/send'
import Router from 'koa-router'

const router: Router = new Router({
  prefix: '/sms'
})

register(router)

export default router
