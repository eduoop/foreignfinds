/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserKey from 'App/Models/UserKey' 
import Mail from '@ioc:Adonis/Addons/Mail'
import { faker } from '@faker-js/faker'
import UpdateValidator from 'App/Validators/User/ForgotPassword/UpdateValidator'
import StoreValidator from 'App/Validators/User/ForgotPassword/StoreValidator'

export default class UserForgotPasswordController {
  public async store({ request }: HttpContextContract) {
    const { email, redirectUrl } = await request.validate(StoreValidator)

    const user = await User.findByOrFail('email', email)

    const key = faker.string.uuid() + user.id

    await user.related('keys').create({ key })

    const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

    await Mail.send((message) => {
      message.to(email)
      message.from('contato@taxIr.com', 'taxIr')
      message.subject('Criação de conta')
      message.htmlView('emails/forgot-password', {
        link,
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const user = await (await UserKey.findByOrFail('key', params.key)).related('user').query().firstOrFail()
    return user
  }

  public async update({ request }: HttpContextContract) {
    const { key, password } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    await userKey.load('user')

    userKey.user.merge({ password })

    await userKey.user.save()

    await userKey.delete()

    return { message: 'password changed successfully' }
  }
}