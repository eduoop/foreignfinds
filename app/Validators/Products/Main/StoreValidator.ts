/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.unique({
      table: 'products',
      column: 'title'
    })]),
    price: schema.number(),
    discount: schema.number.optional(),
    description: schema.string({ trim: true }),
    images: schema.array().members(schema.file({
      size: '5mb',
      extnames: [
        'jpeg',
        'jpg',
        'png',
        'gif',
        'svg',
        'webp',
        'JPEG',
        'JPG',
        'PNG',
        'GIF',
        'SVG',
        'WEBP',
      ],
    }))
  })

  public messages: CustomMessages = {}
}
