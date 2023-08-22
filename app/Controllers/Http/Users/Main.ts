/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateValidator from 'App/Validators/User/Main/UpdateValidator'

export default class UsersController {
  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async update({ request, params }: HttpContextContract) {
    const { name, password, phone, surname } = await request.validate(UpdateValidator)
    const user = await User.findByOrFail("id", params.id)
    await user.merge({ name, password, phone, surname })
    await user.save()

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        surname: user.surname,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
        avatar: user.avatar
      }
    }
  }
}
