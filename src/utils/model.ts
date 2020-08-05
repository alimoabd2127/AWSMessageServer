import Joi from 'joi'
import { Context, Next } from 'koa'

export function verifyModelMiddleware(model: Joi.ObjectSchema) {
  return async (ctx: Context, next: Next): Promise<any> => {
    const validationResult = model.validate(ctx.request.body)
    if (validationResult.error) {
      ctx.throw(400)
    }
    return next()
  }
}
