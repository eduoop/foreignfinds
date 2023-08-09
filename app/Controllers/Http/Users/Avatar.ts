/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { AvatarFactory } from 'App/Factories/upload/avatar';

export default class UserAvatarController {
    public async update({ request, auth, response }: HttpContextContract) {
        await Database.transaction(async (trx) => {
            const file = request.file("file") as MultipartFileContract;

            const user = auth.user!.useTransaction(trx)

            const searchPayload = {}
            const savePayload = {
                fileCategory: 'avatar' as any,
                fileName: `${new Date().getTime()}.${file.extname}`
            }

            const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)
            avatar.save()

            const avatarUseCase = AvatarFactory();

            const imageUrl = await avatarUseCase.execute(file, JSON.stringify(user.id));

            return response.ok({ imageUrl });
        })
    }
}
