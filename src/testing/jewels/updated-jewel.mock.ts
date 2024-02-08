import { listAllJewelsMock } from './list-all-jewels.mock';
import { updateJewelDtoMock } from './update-jewel-dto.mock';

// export const updatedJewelMock = {
//   ...listAllJewelsMock[0],
// };
console.log(7, listAllJewelsMock[0]);
console.log(8, updateJewelDtoMock);
export const updatedJewelMock = Object.assign(
  listAllJewelsMock[0],
  updateJewelDtoMock,
);
