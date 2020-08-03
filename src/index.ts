import mountRoutes from '@/routes'
import AWS from 'aws-sdk'
import koa from 'koa'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import stripAnsi from 'strip-ansi'

AWS.config.update({ region: process.env.AWS_REGION })
const port = 4000
const app = new koa()

app.use(bodyparser())
app.use(
  logger((str, _args: string[]) => {
    console.info(stripAnsi(str).trim())
  })
)
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.info(err.message)
    ctx.status = err.status || 500
    ctx.body = err.message
    console.error(stripAnsi(err.message).trim())
  }
})

mountRoutes(app)
app.listen(port)
