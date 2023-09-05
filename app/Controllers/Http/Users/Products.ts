/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserProducts {
    public async index({ auth }: HttpContextContract) {
        const user = auth.user!

        const ads = user.related("products").query().preload('files').preload('subcategory')

        return ads
    }
}
