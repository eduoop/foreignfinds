/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/Auth/StoreValidator'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate(StoreValidator)

    const token = await auth.attempt(email, password)

    const user = auth.user!

    await user.load('avatar')

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token.token,
        phone: user.phone,
        surname: user.surname,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        avatar: user.avatar
      }
    }
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
