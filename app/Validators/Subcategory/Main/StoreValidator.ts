/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    categoryId: schema.number([rules.exists({ table: "product_categories", column: "id" })]),
    name: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
