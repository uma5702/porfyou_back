import { Module } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PortfolioModule, AuthModule,UsersModule],
})
export class AppModule {}
