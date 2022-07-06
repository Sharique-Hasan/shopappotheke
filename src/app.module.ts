import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VcsModule } from './vcs/vcs.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      VcsModule
  ]
})
export class AppModule {}
