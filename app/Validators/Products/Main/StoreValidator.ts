import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }),
    price: schema.number(),
    discount: schema.number.optional(),
    description: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
