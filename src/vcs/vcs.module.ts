import { Module } from '@nestjs/common';
import { VcsController } from './vcs.controller';
import { VcsService } from './vcs.service';
import { GithubapiService } from './githubapi/githubapi.service';

@Module({
  controllers: [VcsController],
  providers: [VcsService, GithubapiService]
})
export class VcsModule {}
