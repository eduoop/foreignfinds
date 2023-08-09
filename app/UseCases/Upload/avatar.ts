/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { UploadAvatar } from "App/Services/UploadAvatar";

export class AvatarUseCase {
  constructor(private uploadImage: UploadAvatar) {}

  async execute(image: MultipartFileContract, userId: string): Promise<string> {
    return await this.uploadImage.uploadProfileImage(image, userId);
  }
}
