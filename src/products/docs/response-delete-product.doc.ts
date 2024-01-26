import { ApiResponseProperty } from '@nestjs/swagger';
export class ResponseDeleteProductDoc {
  @ApiResponseProperty({
    example: 'Request made successfully',
    type: Object,
  })
  message: string;
}
