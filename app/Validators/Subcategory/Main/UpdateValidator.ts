/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    subcategoryId: schema.number([ rules.exists({ table: "subcategories", column: "id" })]),
    name: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}
