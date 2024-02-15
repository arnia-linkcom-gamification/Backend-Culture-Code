import { UploadImageDto } from '../../users/dto/create-user.dto';
import { getFileToBuffer } from './get-file-buffer.mock';

export const imageMock = async (): Promise<UploadImageDto> => {
  const filename = __dirname + '/NestJS.svg';

  const { buffer } = await getFileToBuffer(filename);

  return {
    fieldname: 'fieldname',
    originalname: 'originalname',
    encoding: 'encoding',
    mimetype: 'mimetype',
    size: 1,
    filename: 'filename',
    buffer,
  };
};
