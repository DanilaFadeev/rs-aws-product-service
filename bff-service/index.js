const Url = require('url');
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;


app.all('/*', async (request, response) => {
	const parsedUrl = Url.parse(request.originalUrl);
	const [, service] = parsedUrl.pathname.match(/^\/([A-Za-z0-9\-]*)\//) || [];

	console.log(`Original url: ${request.originalUrl}`);
	console.log(`Matched service: ${service}`);

	if (!service || !process.env[service]) {
		return response
			.status(502)
			.json({ message: 'Cannot process request' });
	}

	const proxyPath = parsedUrl.path.replace(`/${service}`, '');
	const proxyUrl = `${process.env[service]}${proxyPath}`;

	console.log(`Proxy to ${proxyUrl}`);

	let serviceResponse;
	try {
		serviceResponse = await axios({
			url: proxyUrl,
			method: request.method,
			data: request.data
		});
	} catch (error) {
		return response
			.status(error.response.status)
			.json(error.response.data);
	}

	return response
		.status(serviceResponse.status)
		.json(serviceResponse.data);
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});