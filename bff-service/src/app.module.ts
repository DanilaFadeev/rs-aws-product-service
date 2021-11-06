import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CacheModule.register({
		ttl: 60 * 2 // 2 minutes
	})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
