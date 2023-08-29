/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import Drive from "@ioc:Adonis/Core/Drive";
import Application from '@ioc:Adonis/Core/Application'
import sharp from "sharp";

export class UploadProductImage {
  public async uploadProfileImage(
    image: MultipartFileContract,
    filename: string
  ): Promise<string> {
    const location = "productsImages";
    return await this.uploadFileToDrive(image, location, `${filename}.${image.extname}`);
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

    // const fs = require('fs');

    await file.move(Application.tmpPath(location), {
      name: fileName,
      overwrite: true
    })

    const imagePath = Application.tmpPath(`${location}/${fileName}`)
    // const imageBuffer = await fs.promises.readFile(imagePath);

    const resizedImage = await sharp(imagePath)
      .resize({ width: 800 }) 
      .jpeg({ quality: 80 })
      .webp({ quality: 80 })
      .png({ quality: 80 })
      .toBuffer();

    await Drive.put(`${location}/${fileName}`, resizedImage, {
      visibility: 'public',
      contentType: 'image'
    });

    return await Drive.getUrl(`${location}/${fileName}`);
  }
}

export default function isBuffer(
  file: MultipartFileContract | Buffer
): file is Buffer {
  return (file as Buffer).length !== undefined;
}
