/* eslint-disable prettier/prettier */
import { UploadProductImage } from "App/Services/UploadProductImage";
import { ProductImageUseCase } from "App/UseCases/Upload/productImage";

export function ProductImageFactory(): ProductImageUseCase {
  const uploadImage = new UploadProductImage();
  const useCase = new ProductImageUseCase(uploadImage);

  return useCase;
}
