/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable prettier/prettier */
import type { MultipartFileContract } from "@ioc:Adonis/Core/BodyParser";
import { UploadProductImage } from "App/Services/UploadProductImage";

export class ProductImageUseCase {
  constructor(private uploadImage: UploadProductImage) {}

  async execute(image: MultipartFileContract, userId: string): Promise<string> {
    return await this.uploadImage.uploadProfileImage(image, userId);
  }
}
