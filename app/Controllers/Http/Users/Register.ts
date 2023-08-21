/* eslint-disable prettier/prettier */
import { faker } from '@faker-js/faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import UserKey from 'App/Models/UserKey'
import StoreValidator from 'App/Validators/User/Register/StoreValidator'
import UpdateValidator from 'App/Validators/User/Register/UpdateValidator'

export default class MainsController {
    public async store({ request }: HttpContextContract) {
        await Database.transaction(async (trx) => {
            const { email, redirectUrl, role } = await request.validate(StoreValidator)

            const user = new User()

            user.useTransaction(trx)

            user.email = email

            user.role = role

            await user.save()

            const key = faker.string.uuid() + user.id

            user.related('keys').create({ key })

            const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

            await Mail.send((message) => {
                message.to(email)
                message.from('contato@taxIr.com', 'taxIr')
                message.subject('Criação de conta')
                message.htmlView('emails/register', {
                    link,
                })
            })
        })
    }

    public async show({ params }: HttpContextContract) {
        const userKey = await UserKey.findByOrFail('key', params.key)
        const user = await userKey.related('user').query().firstOrFail()
        return user
    }

    public async update({ request, response }: HttpContextContract) {
        const { key, name, password, phone } = await request.validate(UpdateValidator)

        const userKey = await UserKey.findByOrFail('key', key)

        const user = await userKey.related('user').query().firstOrFail()

        const userSurname = user.name.split(' ')[0] ? user.name.split(' ')[0] : user.name

        user.merge({ name: name, password: password, phone: phone, surname: userSurname})

        await user.save()

        await userKey.delete()

        return response.ok({ message: 'Usuario atualizado!' })
    }
}
