/* eslint-disable prettier/prettier */
import Drive from "@ioc:Adonis/Core/Drive";
import Application from '@ioc:Adonis/Core/Application'
import File from "App/Models/File"

type Props = {
    local: string,
    images: File[]
}

export default async function deleteProductImages({ local, images }: Props) {
    const fs = require('fs/promises');

    if (images) {
        await Promise.all(
            await images.map(async (productMapped) => {
                // delete from temp
                const imageInLocal = await Application.tmpPath(`${local}/${productMapped.fileName}`)

                if (imageInLocal) {
                    fs.unlink(imageInLocal)
                }

                // delete from db
                await productMapped.delete()

                // delete from aws
                await Drive.delete(`${local}/${productMapped.fileName}`)
            })
        )
    }
}