/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    phone: schema.string({ trim: true }),
    surname: schema.string({ trim: true }),
    password: schema.string.optional({ trim: true }, [rules.confirmed('passwordConfirmation')]),
  })

  public messages: CustomMessages = {}
}