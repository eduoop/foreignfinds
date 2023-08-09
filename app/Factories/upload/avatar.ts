/* eslint-disable prettier/prettier */
import { UploadAvatar } from "App/Services/UploadAvatar";
import { AvatarUseCase } from "App/UseCases/Upload/avatar";

export function AvatarFactory(): AvatarUseCase {
  const uploadImage = new UploadAvatar();
  const useCase = new AvatarUseCase(uploadImage);

  return useCase;
}
