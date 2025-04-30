import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'test@domain.com' })
  email!: string;

  @ApiProperty({ example: 'password1234' })
  password!: string;
}
