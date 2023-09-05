import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['jpeg', 'jpg', 'png', 'gif', 'svg', 'JPEG', 'JPG', 'PNG', 'SVG'],
    }),
  })

  public messages: CustomMessages = {}
}
