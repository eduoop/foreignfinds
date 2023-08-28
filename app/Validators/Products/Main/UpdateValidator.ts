/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string({ trim: true }),
    price: schema.string({ trim: true }),
    discount: schema.number.optional(),
    description: schema.string({ trim: true }),
    images: schema.array().members(schema.file.optional({
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
    })),
    imagesDelete: schema.array().members(schema.string.optional()),
    categoryId: schema.number([ rules.exists({ table: "product_categories", column: "id" })]),
    subcategoryId: schema.number([ rules.exists({ table: "subcategories", column: "id" })])
  })

  public messages: CustomMessages = {}
}
