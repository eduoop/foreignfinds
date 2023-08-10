/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/Products/Main/StoreValidator'
import UpdateValidator from 'App/Validators/Products/Main/UpdateValidator'
import { ProductImageFactory } from 'App/Factories/upload/productImage'
import { faker } from '@faker-js/faker'

export default class ProductsController {
  public async index({ }: HttpContextContract) {
    return Product.all()
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const user = auth.user!

      user.useTransaction(trx)

      const { description, discount, price, title, images } = await request.validate(StoreValidator)

      // crate product

      const product = await user.related('products').create({
        description: description,
        discount: discount,
        price: price,
        title: title
      })

      // save product images in files table, in aws and in local paste

      await Promise.all(
        images.map(async (image, index) => {

          const imageId = faker.string.uuid()

          const saveImage = await product.related('files').create({
            fileCategory: 'product_image',
            fileName: `${imageId}.${image.extname}`,
          })
          await saveImage.save()

          const ProductImageUseCase = ProductImageFactory();

          const imageUrl = await ProductImageUseCase.execute(image, imageId);

          return imageUrl
        })
      )

      return response.status(200)
    })

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
