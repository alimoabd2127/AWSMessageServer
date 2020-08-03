import register from '@/routes/email/send'
import Router from 'koa-router'

const router: Router = new Router({
  prefix: '/email'
})

register(router)

export default router
