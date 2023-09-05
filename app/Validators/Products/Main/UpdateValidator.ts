/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    title: schema.string({ trim: true }),
    price: schema.string({ trim: true }),
    description: schema.string({ trim: true }),
    images: schema.array.optional().members(schema.file.optional({
      size: '5mb',
      extnames: [
        'jpeg',
        'jpg',
        'png',
        'svg',
        'JPEG',
        'JPG',
        'PNG',
        'SVG',
      ],
    })),
    imagesDelete: schema.array.optional().members(schema.string.optional()),
    subcategoryId: schema.string({ trim: true}, [ rules.exists({ table: "subcategories", column: "id" })]),
    categoryId: schema.string({ trim: true}, [ rules.exists({ table: "product_categories", column: "id" })])
  })

  public messages: CustomMessages = {}
}
