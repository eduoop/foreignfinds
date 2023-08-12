/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Application from '@ioc:Adonis/Core/Application'
import Drive from "@ioc:Adonis/Core/Drive";
import { AvatarFactory } from 'App/Factories/upload/avatar';

export default class UserAvatarController {
    public async update({ request, auth, response }: HttpContextContract) {
        await Database.transaction(async (trx) => {

            const fs = require('fs/promises');

            const file = request.file("file") as MultipartFileContract;

            const user = auth.user!.useTransaction(trx)

            const userAvatars = await user.related('avatar').query()

            // delete old avatar

            const local = "avatars"

            if (userAvatars.length > 0) {
                await Promise.all(
                    userAvatars.map(async (avatar) => {

                        // delete from temp

                        const imageExtname = avatar.fileName.split(".")[1]

                        const imageInLocal = await Application.tmpPath(`${local}/${avatar.ownerId}.${imageExtname}`)

                        fs.unlink(imageInLocal, (err) => {
                            if (err) {
                                console.error('Ocorreu um erro ao excluir o arquivo:', err);
                            } else {
                                console.log('Arquivo excluído com sucesso!');
                            }
                        })

                        // delete from db
                        await avatar.delete()
                        
                        // delete from aws

                        await Drive.delete(`${local}/${avatar.ownerId}.${imageExtname}`)
                    })
                )
            }

            const searchPayload = {}

            const avatarUseCase = AvatarFactory();

            const imageUrl = await avatarUseCase.execute(file, JSON.stringify(user.id));

            const savePayload = {
                fileCategory: 'avatar' as any,
                fileName: `${new Date().getTime()}.${file.extname}`,
                fileUrl: imageUrl as any
            }

            const avatar = await user.related('avatar').firstOrCreate(searchPayload, savePayload)
            avatar.save()

            return response.ok({ imageUrl });
        })
    }
}
