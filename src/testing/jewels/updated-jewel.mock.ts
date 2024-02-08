import { listAllJewelsMock } from './list-all-jewels.mock';
import { updateJewelDtoMock } from './update-jewel-dto.mock';

export const updatedJewelMock = Object.assign(
  listAllJewelsMock[0],
  updateJewelDtoMock,
);
