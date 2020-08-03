import Joi from 'joi'
import { Context, Next } from 'koa'

export function verifyModelMiddleware(model: Joi.ObjectSchema) {
  return async (ctx: Context, next: Next): Promise<any> => {
    try {
      await model.validate(ctx.request.body)
      return next()
    } catch (error) {
      ctx.throw(400)
    }
  }
}
