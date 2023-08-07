import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import StoreValidator from 'App/Validators/Products/Main/StoreValidator'
import UpdateValidator from 'App/Validators/Products/Main/UpdateValidator'

export default class ProductsController {
  public async index({}: HttpContextContract) {
    return Product.all()
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const data = await request.validate(StoreValidator)

    await user.related('products').create(data)

    return response.status(200)
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    return product
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    const loggedUser = auth.user!

    const data = await request.validate(UpdateValidator)

    if (product.userId !== loggedUser.id && loggedUser.role !== 'admin') {
      return response.unauthorized()
    }

    await product.merge(data).save()

    return response.status(200)
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    const loggedUser = auth.user!

    if (product.userId !== loggedUser.id && loggedUser.role !== 'admin') {
      return response.unauthorized()
    }
  }
}
