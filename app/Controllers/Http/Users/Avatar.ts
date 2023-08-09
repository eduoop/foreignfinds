/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UpdateValidator from 'App/Validators/User/Avatar/UpdateValidator'
import FileService from 'App/Services/File/FileService'

export default class UserAvatarController {
    public async update({ request, auth }: HttpContextContract) {
        await Database.transaction(async (trx) => {
            const { file } = await request.validate(UpdateValidator)

            const user = auth.user!.useTransaction(trx)

            const searchPayload = {}
            const savePayload = {
                fileCategory: 'avatar' as any,
                fileName: `${new Date().getTime()}.${file.extname}`
            }

            const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)
            avatar.save()

            const fileService = new FileService

            const fileUrl = await fileService.uploadProfileImage(file, JSON.stringify(user.id))

            return fileUrl
        })
    }
}
