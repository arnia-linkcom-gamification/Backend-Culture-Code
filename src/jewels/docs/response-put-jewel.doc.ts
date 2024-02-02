import { ApiProperty } from '@nestjs/swagger';
import { CreatedUserDoc } from 'src/users/docs/create-user.doc';

export class ResponsePutJewelDoc extends CreatedUserDoc {
  @ApiProperty({
    type: Array,
    description:
      'No array irá constar a joia que foi atribuida ao usuário bem como outras joias que ele já tiver.',
    example: [],
  })
  jewels: Array<string>;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos produtos do usuário.',
    example: [],
  })
  products: string;
}
