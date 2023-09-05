/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import User from 'App/Models/User'

export default class SellersController {
  public async index({ params, request }: HttpContextContract) {
    const { id } = params

    const { page, limit } = request.qs()

    const user = await User.query().where("id", id).preload("avatar").firstOrFail()

    const userAds = await Product.query().where('userId', id).preload('files').paginate(page, limit)

    return {
      user: user,
      sellerAds: userAds
    }
  }
}
