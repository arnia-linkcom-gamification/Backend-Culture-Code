import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/enums/role.enum';

export class ResponseUpdateUserDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao id do usuário no banco de dados.',
    example: '2',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se ao nome do usuário.',
    example: 'Beltrano',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos sobrenomes do usuário.',
    example: 'de Tal',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se ao email do usuário.',
    example: 'beltrano@usuario.com',
  })
  email: string;

  @ApiProperty({
    enum: RoleEnum,
    description: 'Refere-se ao tipo de usuário.',
    example: RoleEnum.customer,
  })
  role: RoleEnum;

  @ApiProperty({
    type: String,
    description: 'Caminho do arquivo.',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxkzc13zETkv5Wqey4puj3zZos40LpznJN6uCWOpx91r1L98RjOQTAwiD4Pm9DdA5KYqo&usqp=CAU',
  })
  profileImg: string;

  @ApiProperty({
    type: Number,
    description: 'Quantidade de créditos.',
    example: 0,
  })
  credits: number;

  @ApiProperty({
    type: Date,
    description: 'Refere-se a data que o usuário foi deletado.',
    example: null,
  })
  deleteAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Data de inclusão do usuário no banco de dados.',
    example: '2024-01-24T23:00:56.481Z',
  })
  createAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Registra data que houve alguma atualização do usuário.',
    example: '2024-01-24T23:00:56.481Z',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Array,
    description: 'Refere-se as jóias do usuário.',
    example: [],
  })
  jewels: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se aos produtos do usuário.',
    example: [],
  })
  products: string;
}
