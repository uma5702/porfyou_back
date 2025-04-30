import { ApiProperty } from '@nestjs/swagger';
export class UpdatePortfolioDto {
    @ApiProperty({ example: 'portfolio title' })
    title?: string;
    @ApiProperty({ example: 'portfolio description' })
    description?: string;
    category?: string;
  }
  