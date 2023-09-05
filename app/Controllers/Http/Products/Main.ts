/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreValidator from 'App/Validators/Products/Main/StoreValidator'
import UpdateValidator from 'App/Validators/Products/Main/UpdateValidator'
import { ProductImageFactory } from 'App/Factories/upload/productImage'
import { faker } from '@faker-js/faker'
import File from 'App/Models/File'
import deleteProductImages from 'App/Utils/Functions/deleteProductImages';

export default class ProductsController {
  public async index({ request }: HttpContextContract) {

    const { search, page, limit } = request.qs();

    const allProducts = await Product.query().if(search, (query) => {
      query.where('title', "ilike", `%${search}%`)
    }).preload('files').preload("subcategory").paginate(page, limit)

    return allProducts
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const user = auth.user!

      user.useTransaction(trx)

      const { description, price, title, images, subcategoryId, categoryId } = await request.validate(StoreValidator)

      // crate product

      const subcategoryIdNumber = Number(subcategoryId)
      const categoryIdNumber = Number(categoryId)

      const numberPrice = Number(price)

      const product = await user.related('products').create({
        description: description,
        price: numberPrice,
        title: title,
        subcategoryId: subcategoryIdNumber,
        productCategoryId: categoryIdNumber
      }) 

      // save product images in files table, in aws and in local paste

      if (images.length > 5) {
        return response.unauthorized("you only have 5 images")
      }

      await Promise.all(
        images.map(async (image) => {

          const imageId = faker.string.uuid()

          const ProductImageUseCase = ProductImageFactory();

          const imageUrl = await ProductImageUseCase.execute(image, imageId);

          const saveImage = await product.related('files').create({
            fileCategory: 'product_image',
            fileName: `${imageId}.${image.extname}`,
            fileUrl: imageUrl
          })
          await saveImage.save()

          return imageUrl
        })
      )

      return response.status(200)
    })

  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.query().where('id', params.id).preload("user", query => {
      query.preload("avatar")
    }).preload("files").preload("productCategory").preload("subcategory").firstOrFail()

    const productViews = product.views + 1;

    product.views = productViews
    await product.save()

    return product
  }

  public async update({ auth, request, response, params }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    const loggedUser = auth.user!

    const { description, price, title, images, imagesDelete, subcategoryId, categoryId } = await request.validate(UpdateValidator)

    const numberPrice = Number(price)

    if (product.userId !== loggedUser.id && loggedUser.role !== 'admin') {
      return response.unauthorized()
    }

    const subcategoryIdNumber = Number(subcategoryId)
    const categoryIdNumber = Number(categoryId)

    await product.merge({
      description: description,
      previousPrice: product.price !== Number(price) ? product.price : undefined,
      title: title,
      price: numberPrice,
      subcategoryId: subcategoryIdNumber,
      productCategoryId: categoryIdNumber
    }).save()

    // save product images in files table, in aws and in local paste

    const productExistsImages = await product.related('files').query()

    if (images) {
      if (imagesDelete) {
        if (productExistsImages.length - imagesDelete.length + images.length > 6) {
          return response.unauthorized("you only have 6 images")
        }
      }

      if (productExistsImages.length + images.length > 6) {
        return response.unauthorized("you only have 6 images")
      }

      await Promise.all(
        images.map(async (image) => {
          if (image) {
            const imageId = faker.string.uuid()

            const ProductImageUseCase = ProductImageFactory();

            const imageUrl = await ProductImageUseCase.execute(image, imageId);

            const saveImage = await product.related('files').create({
              fileCategory: 'product_image',
              fileName: `${imageId}.${image.extname}`,
              fileUrl: imageUrl
            })

            await saveImage.save()

            return imageUrl
          }
        })
      )
    }

    // delete products images

    const local = "productsImages"

    if (imagesDelete) {
      const filteredImagesDelete = await imagesDelete.map((image) => {
        return image !== null && image !== undefined && image
      })
      if (filteredImagesDelete) {
        const images = await File.query().whereIn('file_name', filteredImagesDelete).andWhere('owner_id', product.id)
        await deleteProductImages({ images: images, local: local })
      }
      return response.status(200)
    }
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const product = await Product.findByOrFail('id', params.id)

    const local = "productsImages"

    const productImages = await product.related('files').query()

    await deleteProductImages({ images: productImages, local: local })

    const loggedUser = auth.user!

    await product.delete()

    if (product.userId !== loggedUser.id && loggedUser.role !== 'admin') {
      return response.unauthorized()
    }

    return response.status(200)
  }
}
