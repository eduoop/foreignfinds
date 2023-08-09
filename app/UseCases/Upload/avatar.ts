/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { UploadImage } from "App/Services/UploadImage";
import { randomUUID } from "crypto";

export class AvatarUseCase {
  constructor(private uploadImage: UploadImage) {}

  async execute(image: MultipartFileContract, userId: string): Promise<string> {
    const filename = randomUUID();
    return await this.uploadImage.uploadProfileImage(image, userId);
  }
}
