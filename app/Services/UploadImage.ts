/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Drive from "@ioc:Adonis/Core/Drive";
import Application from '@ioc:Adonis/Core/Application'

export class UploadImage {
  public async uploadProfileImage(
    image: MultipartFileContract,
    filename: string
  ): Promise<string> {
    const location = "avatars";
    return await this.uploadFileToDrive(image, location, `${filename}.png`);
  }

  private async uploadFileToDrive(
    file: MultipartFileContract | Buffer,
    location: string,
    fileName: string
  ): Promise<string> {
    if (isBuffer(file)) {
      await Drive.put(`${location}/${fileName}`, file);
      return await Drive.getUrl(`${location}/${fileName}`);
    }

    // await file.moveToDisk(location, { name: fileName });

    await file.move(Application.tmpPath('avatars'), {
      name: fileName,
      overwrite: true
    })

    return await Drive.getUrl(`${location}/${fileName}`);
  }
}

export default function isBuffer(
  file: MultipartFileContract | Buffer
): file is Buffer {
  return (file as Buffer).length !== undefined;
}
