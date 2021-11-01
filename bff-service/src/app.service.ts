import { URL } from 'url';
import axios, { Method, AxiosRequestConfig } from 'axios';
import { Injectable, Logger } from '@nestjs/common';

interface IProxyResponse {
	status: number;
	data: Record<string, any>;
}

@Injectable()
export class AppService {

	private readonly logger = new Logger(AppService.name);

	getProxyPath(originalUrl: string, host: string): string {
		const parsedUrl = new URL(originalUrl, `http://${host}`);
		const [, service] = parsedUrl.pathname.match(/^\/([A-Za-z0-9\-]*)\//) || [];

		this.logger.log(`Original url: ${originalUrl}`);
		this.logger.log(`Matched service: ${service}`);

		if (!service || !process.env[service]) {
			this.logger.warn(`Proxy mapping for ${service} is not found`);
			return null;
		}

		const proxyPath = parsedUrl.pathname.replace(`/${service}`, '');
		const proxyUrl = `${process.env[service]}${proxyPath}${parsedUrl.search}`;

		this.logger.log(`Proxy to ${proxyUrl}`);

		return proxyUrl;
	}

	async sendRequest(url: string, method: Method, data: Record<string, any> = {}): Promise<IProxyResponse> {
		const response: IProxyResponse = { status: 200, data: {} };

		try {
			const requestConfig: AxiosRequestConfig = { url, method };
			if (Object.keys(data).length) {
				requestConfig.data = data;
			}
		
			const serviceResponse = await axios(requestConfig);
			response.status = serviceResponse.status;
			response.data = serviceResponse.data;
		} catch (error) {
			response.status = error.response.status;
			response.data = error.response.data;
		}

		return response;
	}
}
