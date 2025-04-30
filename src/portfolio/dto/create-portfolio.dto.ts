import { ApiProperty } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty({ example: 'portfolio title' })
  title!: string;
  @ApiProperty({ example: 'portfolio description' })
  description!: string;
  @ApiProperty({ example: 'portfolio githubUrl' })
  githubUrl?: string;
  @ApiProperty({ example: 'portfolio googleDocUrl' })
  googleDocUrl?: string;
}
