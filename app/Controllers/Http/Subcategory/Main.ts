/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductCategory from 'App/Models/ProductCategory'
import Subcategory from 'App/Models/Subcategory'
import StoreValidator from 'App/Validators/Subcategory/Main/StoreValidator'
import UpdateValidator from 'App/Validators/Subcategory/Main/UpdateValidator'

export default class SubcategoryController {
  public async index({}: HttpContextContract) {
    const subcategories = Subcategory.all()
    return subcategories
  }

  public async store({ request }: HttpContextContract) {
    const { categoryId, name } = await request.validate(StoreValidator)
    const category = await ProductCategory.findByOrFail("id", categoryId)
    const subcategory = await category.related("subcategories").create({
      name: name,
    })

    return subcategory
  }

  public async show({ params }: HttpContextContract) {
    const subcategory = await Subcategory.findByOrFail("id", params.id)
    return subcategory
  }

  public async update({ request }: HttpContextContract) {
    const { subcategoryId, name } = await request.validate(UpdateValidator)
    const subcategory = await Subcategory.findByOrFail("id", subcategoryId)

    await subcategory.merge({ name: name }).save()

    return subcategory

  }

  public async destroy({ params }: HttpContextContract) {
    const subcategory = await Subcategory.findByOrFail("id", params.id)
    await subcategory.delete()
  }
}
