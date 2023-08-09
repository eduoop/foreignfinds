/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Drive from "@ioc:Adonis/Core/Drive";
import isBuffer from "App/Utils/Functions/isBuffer";

export default class FileService {
    public async uploadProfileImage(profileImg: MultipartFileContract, userId: string): Promise<string> {
        const location = `avatars`
        return await this.uploadFileToDrive(profileImg, location, userId)
    }

    private async uploadFileToDrive(file: MultipartFileContract | Buffer, location: string, fileName: string): Promise<string> {
        if (isBuffer(file)) {
            await Drive.put(`${location}/${fileName}`, file)
        }
        else {
            await file?.moveToDisk(location, { name: fileName })
        }

        return await Drive.getUrl(`${location}/${fileName}`)
    }
}
