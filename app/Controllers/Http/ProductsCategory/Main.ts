/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import StoreValidator from 'App/Validators/ProductsCategory/Main/StoreValidator'
import UpdateValidator from 'App/Validators/ProductsCategory/Main/UpdateValidator'

export default class MainsController {
  public async index({ }: HttpContextContract) {
    const allCategories = await ProductCategory.query().preload("subcategories")

    return allCategories
  }

  public async store({ request }: HttpContextContract) {
    const { name } = await request.validate(StoreValidator)


    const productCategory = await ProductCategory.create({
      name: name,
    })

    return productCategory

  }

  public async show({ params }: HttpContextContract) {
    const productCategory = await ProductCategory.query().where('id', params.id).firstOrFail()
    return productCategory
  }

  public async update({ params, request }: HttpContextContract) {
    const productCategory = await ProductCategory.query().where('id', params.id).firstOrFail()
    const { name } = await request.validate(UpdateValidator)
    await productCategory.merge({ name: name }).save()

    return productCategory
  }

  public async destroy({ params }: HttpContextContract) {
    const productCategory = await ProductCategory.query().where('id', params.id).firstOrFail()
    await productCategory.delete()
  }
}
