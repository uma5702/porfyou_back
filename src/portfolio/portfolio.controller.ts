import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { Request as ExpressRequest } from 'express';

@Controller('portfolio')
@UseGuards(JwtGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  create(@Body() dto: CreatePortfolioDto, @Request() req: ExpressRequest) {
    return this.portfolioService.create(dto, (req.user as any).id);
  }
  @Get()
  findAll() {
    console.log('test');
    return this.portfolioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto, @Request() req: ExpressRequest) {
    return this.portfolioService.update(id, updatePortfolioDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.portfolioService.remove(id, req.user);
  }
}
