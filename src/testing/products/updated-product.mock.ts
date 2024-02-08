import { productMock } from './product.mock';
import { updateProductMock } from './update-product-mock';

export const updatedProductMock = {
  ...updateProductMock,
  ...productMock,
};
