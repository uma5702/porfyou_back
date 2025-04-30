import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty({ example: 'test@domain.com' })  
    email!: string;
    @ApiProperty({ example: 'password' })
    password!: string;
    @ApiProperty({ example: 'user or admin' })
    role!: 'user' | 'admin';
  }
  