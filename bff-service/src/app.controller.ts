import { Controller, Get, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

import type { Method } from 'axios';
import type { Request, Response } from 'express';

@Controller('/*')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async proxy(@Req() request: Request, @Res() response: Response): Promise<object> {
		const url = this.appService.getProxyPath(request.url, request.headers.host);

		if (!url) {
			throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
		}

		const result = await this.appService.sendRequest(url, request.method as Method, request.body);
		return response.status(result.status).json(result.data);
  }
}
