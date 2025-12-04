// product.interface.ts
export interface Iproduct {
  id: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
  discount: number;
  productImgURl?: string;
  productsDetails?: string;
  catatId: number;
}