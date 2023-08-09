/* eslint-disable prettier/prettier */
import { UploadImage } from "App/Services/UploadImage";
import { AvatarUseCase } from "App/UseCases/Upload/avatar";

export function AvatarFactory(): AvatarUseCase {
  const uploadImage = new UploadImage();
  const useCase = new AvatarUseCase(uploadImage);

  return useCase;
}
