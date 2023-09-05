/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class RelatedAdsController {
  public async index({ request, params }: HttpContextContract) {
    const { id } = params
    const { subcategoryId, limit } = request.qs()

    const ads = Product.query().where("product_category_id", id).andWhere("subcategory_id", subcategoryId).preload("files").limit(limit)

    return ads
  }
}
