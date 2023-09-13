/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class RelatedAdsController {
  public async index({ request, params }: HttpContextContract) {
    const { id } = params
    const { subcategoryId, limit, currentAdPrice, adId } = request.qs()

    const ads = await Product
      .query()
      .where("product_category_id", id)
      .andWhere("subcategory_id", subcategoryId)
      .andWhereNot("id", adId)
      .preload("files")
      .limit(limit)

    const filteredAds = await Promise.all(
      ads.map((ad) => {
        const twentyPrice = (20 / 100) * ad.price

        const moreTwentyPercent = ad.price + twentyPrice
        const smallerTwentyPercent = ad.price - twentyPrice

        if (moreTwentyPercent >= currentAdPrice && smallerTwentyPercent <= currentAdPrice) {
          return ad
        }
      })
    )

    return filteredAds
  }
}
