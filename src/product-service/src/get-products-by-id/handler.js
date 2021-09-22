/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/get-products-by-id/handler.ts":
/*!*****************************************************!*\
  !*** ./src/functions/get-products-by-id/handler.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getProductsById\": () => (/* binding */ getProductsById)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var _libs_httpErrors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../libs/httpErrors */ \"./src/libs/httpErrors.ts\");\n/* harmony import */ var _libs_DatabaseClient__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../libs/DatabaseClient */ \"./src/libs/DatabaseClient.ts\");\n/* harmony import */ var _resources_product_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../resources/product/product.service */ \"./src/resources/product/product.service.ts\");\n\n\n\n\n\n\nconst handler = async (event) => {\n    const { id } = event.pathParameters || {};\n    if (!id) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(400, { status: 'BadRequest', message: 'Parameter id is not specified' });\n    }\n    const client = new _libs_DatabaseClient__WEBPACK_IMPORTED_MODULE_4__.default();\n    try {\n        await client.connect();\n    }\n    catch (error) {\n        console.log(error);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, { status: 'InternalServerError', message: 'Database connection failed' });\n    }\n    const productService = new _resources_product_product_service__WEBPACK_IMPORTED_MODULE_5__.default(client);\n    try {\n        const product = await productService.findById(id);\n        if (!product) {\n            throw new _libs_httpErrors__WEBPACK_IMPORTED_MODULE_3__.NotFound('Resource is not found');\n        }\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, product);\n    }\n    catch (error) {\n        console.log(error);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, { status: 'InternalServerError', message: 'Failed to get the list of products' });\n    }\n    finally {\n        await client.disconnect();\n    }\n};\nconst getProductsById = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2dldC1wcm9kdWN0cy1ieS1pZC9oYW5kbGVyLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2Z1bmN0aW9ucy9nZXQtcHJvZHVjdHMtYnktaWQvaGFuZGxlci50cz9mZTA2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHsgZm9ybWF0SlNPTlJlc3BvbnNlLCBBUElHYXRld2F5UHJveHlIYW5kbGVyIH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSAnQGxpYnMvbGFtYmRhJztcblxuaW1wb3J0ICogYXMgaHR0cEVycm9ycyBmcm9tICcuLi8uLi9saWJzL2h0dHBFcnJvcnMnO1xuaW1wb3J0IERhdGFiYXNlQ2xpZW50IGZyb20gJy4uLy4uL2xpYnMvRGF0YWJhc2VDbGllbnQnO1xuaW1wb3J0IFByb2R1Y3RTZXJ2aWNlIGZyb20gJy4uLy4uL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZSc7XG5cblxuY29uc3QgaGFuZGxlcjogQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IGFzeW5jIChldmVudCkgPT4ge1xuICBjb25zdCB7IGlkIH0gPSBldmVudC5wYXRoUGFyYW1ldGVycyB8fCB7fTtcbiAgaWYgKCFpZCkge1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNDAwLCB7IHN0YXR1czogJ0JhZFJlcXVlc3QnLCBtZXNzYWdlOiAnUGFyYW1ldGVyIGlkIGlzIG5vdCBzcGVjaWZpZWQnIH0pO1xuICB9XG5cbiAgY29uc3QgY2xpZW50ID0gbmV3IERhdGFiYXNlQ2xpZW50KCk7XG4gIHRyeSB7XG4gICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZSg1MDAsIHsgc3RhdHVzOiAnSW50ZXJuYWxTZXJ2ZXJFcnJvcicsIG1lc3NhZ2U6ICdEYXRhYmFzZSBjb25uZWN0aW9uIGZhaWxlZCcgfSk7XG4gIH1cblxuICBjb25zdCBwcm9kdWN0U2VydmljZSA9IG5ldyBQcm9kdWN0U2VydmljZShjbGllbnQpO1xuICB0cnkge1xuICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcm9kdWN0U2VydmljZS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFwcm9kdWN0KSB7XG4gICAgICB0aHJvdyBuZXcgaHR0cEVycm9ycy5Ob3RGb3VuZCgnUmVzb3VyY2UgaXMgbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoMjAwLCBwcm9kdWN0KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZSg1MDAsIHsgc3RhdHVzOiAnSW50ZXJuYWxTZXJ2ZXJFcnJvcicsIG1lc3NhZ2U6ICdGYWlsZWQgdG8gZ2V0IHRoZSBsaXN0IG9mIHByb2R1Y3RzJyB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhd2FpdCBjbGllbnQuZGlzY29ubmVjdCgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9kdWN0c0J5SWQgPSBtaWRkeWZ5KGhhbmRsZXIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/functions/get-products-by-id/handler.ts\n");

/***/ }),

/***/ "./src/libs/DatabaseClient.ts":
/*!************************************!*\
  !*** ./src/libs/DatabaseClient.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DatabaseClient)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pg__WEBPACK_IMPORTED_MODULE_0__);\n\nclass DatabaseClient {\n    constructor() {\n        this.client = new pg__WEBPACK_IMPORTED_MODULE_0__.Client({\n            host: process.env.PG_HOST,\n            port: +process.env.PG_PORT,\n            user: process.env.PG_USER,\n            password: process.env.PG_PASSWORD,\n            database: process.env.PG_DATABASE,\n            connectionTimeoutMillis: 2000\n        });\n    }\n    async connect() {\n        console.log(`Connecting to ${this.client.database} database...`);\n        await this.client.connect();\n    }\n    async disconnect() {\n        console.log(`Disconnecting from ${this.client.database} database...`);\n        await this.client.end();\n    }\n    async execute(query) {\n        console.log(query);\n        const { rows } = await this.client.query(query);\n        return rows;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9EYXRhYmFzZUNsaWVudC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2xpYnMvRGF0YWJhc2VDbGllbnQudHM/MWQ4NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQgfSBmcm9tICdwZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFiYXNlQ2xpZW50IHtcbiAgcHJpdmF0ZSByZWFkb25seSBjbGllbnQ6IENsaWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNsaWVudCA9IG5ldyBDbGllbnQoe1xuICAgICAgaG9zdDogcHJvY2Vzcy5lbnYuUEdfSE9TVCxcbiAgICAgIHBvcnQ6ICtwcm9jZXNzLmVudi5QR19QT1JULFxuICAgICAgdXNlcjogcHJvY2Vzcy5lbnYuUEdfVVNFUixcbiAgICAgIHBhc3N3b3JkOiBwcm9jZXNzLmVudi5QR19QQVNTV09SRCxcbiAgICAgIGRhdGFiYXNlOiBwcm9jZXNzLmVudi5QR19EQVRBQkFTRSxcblxuICAgICAgY29ubmVjdGlvblRpbWVvdXRNaWxsaXM6IDIwMDBcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBjb25uZWN0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKGBDb25uZWN0aW5nIHRvICR7dGhpcy5jbGllbnQuZGF0YWJhc2V9IGRhdGFiYXNlLi4uYCk7XG4gICAgYXdhaXQgdGhpcy5jbGllbnQuY29ubmVjdCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGRpc2Nvbm5lY3QoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc29sZS5sb2coYERpc2Nvbm5lY3RpbmcgZnJvbSAke3RoaXMuY2xpZW50LmRhdGFiYXNlfSBkYXRhYmFzZS4uLmApO1xuICAgIGF3YWl0IHRoaXMuY2xpZW50LmVuZCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGV4ZWN1dGU8VCA9IGFueT4ocXVlcnk6IHN0cmluZyk6IFByb21pc2U8VFtdPiB7XG4gICAgY29uc29sZS5sb2cocXVlcnkpO1xuICAgIGNvbnN0IHsgcm93cyB9ID0gYXdhaXQgdGhpcy5jbGllbnQucXVlcnkocXVlcnkpO1xuICAgIHJldHVybiByb3dzO1xuICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/libs/DatabaseClient.ts\n");

/***/ }),

/***/ "./src/libs/apiGateway.ts":
/*!********************************!*\
  !*** ./src/libs/apiGateway.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formatJSONResponse\": () => (/* binding */ formatJSONResponse)\n/* harmony export */ });\nconst formatJSONResponse = (statusCode, response) => {\n    return {\n        statusCode,\n        headers: {\n            'Access-Control-Allow-Origin': '*',\n            'Access-Control-Allow-Credentials': true,\n        },\n        body: JSON.stringify(response)\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9hcGlHYXRld2F5LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2R1Y3Qtc2VydmljZS8uL3NyYy9saWJzL2FwaUdhdGV3YXkudHM/NjI1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIEhhbmRsZXIgfSBmcm9tICdhd3MtbGFtYmRhJztcblxuZXhwb3J0IHR5cGUgQVBJR2F0ZXdheVByb3h5SGFuZGxlciA9IEhhbmRsZXI8QVBJR2F0ZXdheVByb3h5RXZlbnQsIEFQSUdhdGV3YXlQcm94eVJlc3VsdD47XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRKU09OUmVzcG9uc2UgPSAoc3RhdHVzQ29kZTogbnVtYmVyLCByZXNwb25zZTogUmVjb3JkPHN0cmluZywgYW55PiB8IEFycmF5PHVua25vd24+KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzQ29kZSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLCAvLyBSZXF1aXJlZCBmb3IgQ09SUyBzdXBwb3J0IHRvIHdvcmtcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsIC8vIFJlcXVpcmVkIGZvciBjb29raWVzLCBhdXRob3JpemF0aW9uIGhlYWRlcnMgd2l0aCBIVFRQU1xuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/libs/apiGateway.ts\n");

/***/ }),

/***/ "./src/libs/httpErrors.ts":
/*!********************************!*\
  !*** ./src/libs/httpErrors.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BadRequest\": () => (/* binding */ BadRequest),\n/* harmony export */   \"NotFound\": () => (/* binding */ NotFound),\n/* harmony export */   \"InternalServerError\": () => (/* binding */ InternalServerError)\n/* harmony export */ });\nclass HttpError extends Error {\n    constructor(status, statusCode, message) {\n        super(message);\n        this.status = status;\n        this.statusCode = statusCode;\n    }\n}\nvar HttpStatus;\n(function (HttpStatus) {\n    HttpStatus[HttpStatus[\"BadRequest\"] = 400] = \"BadRequest\";\n    HttpStatus[HttpStatus[\"NotFound\"] = 404] = \"NotFound\";\n    HttpStatus[HttpStatus[\"InternalServerError\"] = 500] = \"InternalServerError\";\n})(HttpStatus || (HttpStatus = {}));\nvar HttpStatusCode;\n(function (HttpStatusCode) {\n    HttpStatusCode[\"BadRequest\"] = \"BadRequest\";\n    HttpStatusCode[\"NotFound\"] = \"NotFound\";\n    HttpStatusCode[\"InternalServerError\"] = \"InternalServerError\";\n})(HttpStatusCode || (HttpStatusCode = {}));\nclass BadRequest extends HttpError {\n    constructor(message) {\n        super(HttpStatus.BadRequest, HttpStatusCode.BadRequest, message);\n    }\n}\nclass NotFound extends HttpError {\n    constructor(message) {\n        super(HttpStatus.NotFound, HttpStatusCode.NotFound, message);\n    }\n}\nclass InternalServerError extends HttpError {\n    constructor(message) {\n        super(HttpStatus.InternalServerError, HttpStatusCode.InternalServerError, message);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9odHRwRXJyb3JzLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2xpYnMvaHR0cEVycm9ycy50cz9kZTM2Il0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEh0dHBFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdHVzOiBudW1iZXI7XG4gIHN0YXR1c0NvZGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzdGF0dXM6IG51bWJlciwgc3RhdHVzQ29kZTogc3RyaW5nLCBtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG5cbiAgICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICB9XG59XG5cbmVudW0gSHR0cFN0YXR1cyB7XG4gIEJhZFJlcXVlc3QgPSA0MDAsXG4gIE5vdEZvdW5kID0gNDA0LFxuICBJbnRlcm5hbFNlcnZlckVycm9yID0gNTAwXG59XG5cbmVudW0gSHR0cFN0YXR1c0NvZGUge1xuICBCYWRSZXF1ZXN0ID0gJ0JhZFJlcXVlc3QnLFxuICBOb3RGb3VuZCA9ICdOb3RGb3VuZCcsXG4gIEludGVybmFsU2VydmVyRXJyb3IgPSAnSW50ZXJuYWxTZXJ2ZXJFcnJvcidcbn1cblxuZXhwb3J0IGNsYXNzIEJhZFJlcXVlc3QgZXh0ZW5kcyBIdHRwRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoSHR0cFN0YXR1cy5CYWRSZXF1ZXN0LCBIdHRwU3RhdHVzQ29kZS5CYWRSZXF1ZXN0LCBtZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm90Rm91bmQgZXh0ZW5kcyBIdHRwRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoSHR0cFN0YXR1cy5Ob3RGb3VuZCwgSHR0cFN0YXR1c0NvZGUuTm90Rm91bmQsIG1lc3NhZ2UpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbFNlcnZlckVycm9yIGV4dGVuZHMgSHR0cEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZT86IHN0cmluZykge1xuICAgIHN1cGVyKEh0dHBTdGF0dXMuSW50ZXJuYWxTZXJ2ZXJFcnJvciwgSHR0cFN0YXR1c0NvZGUuSW50ZXJuYWxTZXJ2ZXJFcnJvciwgbWVzc2FnZSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/libs/httpErrors.ts\n");

/***/ }),

/***/ "./src/libs/lambda.ts":
/*!****************************!*\
  !*** ./src/libs/lambda.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"middyfy\": () => (/* binding */ middyfy)\n/* harmony export */ });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ \"@middy/http-json-body-parser\");\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst requestLogger = async (request) => {\n    console.log(request.event, request.context);\n};\nconst middyfy = (handler) => _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler)\n    .before(requestLogger)\n    .use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9sYW1iZGEudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL2xpYnMvbGFtYmRhLnRzPzZiMjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1pZGR5IGZyb20gJ0BtaWRkeS9jb3JlJztcbmltcG9ydCBtaWRkeUpzb25Cb2R5UGFyc2VyIGZyb20gJ0BtaWRkeS9odHRwLWpzb24tYm9keS1wYXJzZXInO1xuXG5jb25zdCByZXF1ZXN0TG9nZ2VyID0gYXN5bmMgKHJlcXVlc3QpID0+IHtcbiAgLy8gZG8gdGhlIGxvZyBmb3IgZWFjaCBpbmNvbWluZyByZXF1ZXN0IGFuZCBpdHMgYXJndW1lbnRzXG4gIGNvbnNvbGUubG9nKHJlcXVlc3QuZXZlbnQsIHJlcXVlc3QuY29udGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBtaWRkeWZ5ID0gKGhhbmRsZXIpID0+XG4gIG1pZGR5KGhhbmRsZXIpXG4gICAgLmJlZm9yZShyZXF1ZXN0TG9nZ2VyKVxuICAgIC51c2UobWlkZHlKc29uQm9keVBhcnNlcigpKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/libs/lambda.ts\n");

/***/ }),

/***/ "./src/resources/product/product.service.ts":
/*!**************************************************!*\
  !*** ./src/resources/product/product.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProductService)\n/* harmony export */ });\nconst val = (value) => {\n    if (typeof value === 'string') {\n        return `'${value}'`;\n    }\n    if (typeof value === 'undefined') {\n        return 'NULL';\n    }\n    if (Array.isArray(value)) {\n        return `'{${(value || []).join(', ')}}'`;\n    }\n    return value.toString();\n};\nclass ProductService {\n    constructor(dbClient) {\n        this.dbClient = dbClient;\n    }\n    async find() {\n        const query = `SELECT * FROM ${ProductService.table} JOIN stocks AS st ON (st.product_id = ${ProductService.table}.id)`;\n        return this.dbClient.execute(query);\n    }\n    async findById(id) {\n        const query = `SELECT * FROM ${ProductService.table} LEFT JOIN stocks AS st ON (st.product_id = ${ProductService.table}.id) WHERE id='${id}'`;\n        const [product] = await this.dbClient.execute(query);\n        return product;\n    }\n    async createStockProduct(data) {\n        let productId;\n        await this.dbClient.execute('BEGIN');\n        try {\n            productId = await this.createProduct(data);\n            await this.createStock(productId);\n            await this.dbClient.execute('COMMIT');\n        }\n        catch (error) {\n            console.log(error);\n            await this.dbClient.execute('ROLLBACK');\n            throw new Error(error.message);\n        }\n        return productId;\n    }\n    async createProduct(data) {\n        const fields = ['title', 'artists', 'coveruri', 'type', 'duration', 'price', 'discount', 'releasedate', 'genre', 'lyrics'];\n        const query = `\n      INSERT INTO ${ProductService.table}\n        (${fields.map(f => `\"${f}\"`).join(', ')})\n      VALUES\n        (${fields.map(f => val(data[f])).join(', ')})\n      RETURNING\n        \"id\"\n    `;\n        const [{ id }] = await this.dbClient.execute(query);\n        return id;\n    }\n    async createStock(productId, count = 1) {\n        const query = `INSERT INTO stocks (\"product_id\", \"count\") VALUES ('${productId}', ${count})`;\n        await this.dbClient.execute(query);\n    }\n}\nProductService.table = 'products';\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcmVzb3VyY2VzL3Byb2R1Y3QvcHJvZHVjdC5zZXJ2aWNlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBbkRBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvZHVjdC1zZXJ2aWNlLy4vc3JjL3Jlc291cmNlcy9wcm9kdWN0L3Byb2R1Y3Quc2VydmljZS50cz8wZjZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2R1Y3QgfSBmcm9tICcuL3Byb2R1Y3Quc2NoZW1hJztcbmltcG9ydCBEYXRhYmFzZUNsaWVudCBmcm9tICcuLi8uLi9saWJzL0RhdGFiYXNlQ2xpZW50JztcblxuY29uc3QgdmFsID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBBcnJheTxzdHJpbmc+KTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gYCcke3ZhbHVlfSdgO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuICdOVUxMJztcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gYCd7JHsodmFsdWUgYXMgQXJyYXk8c3RyaW5nPiB8fCBbXSkuam9pbignLCAnKX19J2A7XG4gIH1cbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBkYkNsaWVudDogRGF0YWJhc2VDbGllbnRcbiAgKSB7fVxuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHRhYmxlID0gJ3Byb2R1Y3RzJztcblxuICBwdWJsaWMgYXN5bmMgZmluZCgpOiBQcm9taXNlPFByb2R1Y3RbXT4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCAqIEZST00gJHtQcm9kdWN0U2VydmljZS50YWJsZX0gSk9JTiBzdG9ja3MgQVMgc3QgT04gKHN0LnByb2R1Y3RfaWQgPSAke1Byb2R1Y3RTZXJ2aWNlLnRhYmxlfS5pZClgO1xuICAgIHJldHVybiB0aGlzLmRiQ2xpZW50LmV4ZWN1dGU8UHJvZHVjdD4ocXVlcnkpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGZpbmRCeUlkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFByb2R1Y3Q+IHtcbiAgICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgKiBGUk9NICR7UHJvZHVjdFNlcnZpY2UudGFibGV9IExFRlQgSk9JTiBzdG9ja3MgQVMgc3QgT04gKHN0LnByb2R1Y3RfaWQgPSAke1Byb2R1Y3RTZXJ2aWNlLnRhYmxlfS5pZCkgV0hFUkUgaWQ9JyR7aWR9J2A7XG4gICAgY29uc3QgW3Byb2R1Y3RdID0gYXdhaXQgdGhpcy5kYkNsaWVudC5leGVjdXRlPFByb2R1Y3Q+KHF1ZXJ5KTtcblxuICAgIHJldHVybiBwcm9kdWN0O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGNyZWF0ZVN0b2NrUHJvZHVjdChkYXRhOiBQcm9kdWN0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBsZXQgcHJvZHVjdElkOiBzdHJpbmc7XG4gICAgYXdhaXQgdGhpcy5kYkNsaWVudC5leGVjdXRlKCdCRUdJTicpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHByb2R1Y3RJZCA9IGF3YWl0IHRoaXMuY3JlYXRlUHJvZHVjdChkYXRhKTtcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU3RvY2socHJvZHVjdElkKTtcblxuICAgICAgYXdhaXQgdGhpcy5kYkNsaWVudC5leGVjdXRlKCdDT01NSVQnKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgICBhd2FpdCB0aGlzLmRiQ2xpZW50LmV4ZWN1dGUoJ1JPTExCQUNLJyk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2R1Y3RJZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlUHJvZHVjdChkYXRhOiBQcm9kdWN0KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBmaWVsZHMgPSBbJ3RpdGxlJywgJ2FydGlzdHMnLCAnY292ZXJ1cmknLCAndHlwZScsICdkdXJhdGlvbicsICdwcmljZScsICdkaXNjb3VudCcsICdyZWxlYXNlZGF0ZScsICdnZW5yZScsICdseXJpY3MnXTtcbiAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgIElOU0VSVCBJTlRPICR7UHJvZHVjdFNlcnZpY2UudGFibGV9XG4gICAgICAgICgke2ZpZWxkcy5tYXAoZiA9PiBgXCIke2Z9XCJgKS5qb2luKCcsICcpfSlcbiAgICAgIFZBTFVFU1xuICAgICAgICAoJHtmaWVsZHMubWFwKGYgPT4gdmFsKGRhdGFbZl0gYXMgYW55KSkuam9pbignLCAnKX0pXG4gICAgICBSRVRVUk5JTkdcbiAgICAgICAgXCJpZFwiXG4gICAgYDtcblxuICAgIGNvbnN0IFt7IGlkIH1dID0gYXdhaXQgdGhpcy5kYkNsaWVudC5leGVjdXRlPHsgaWQ6IHN0cmluZyB9PihxdWVyeSk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTdG9jayhwcm9kdWN0SWQ6IHN0cmluZywgY291bnQgPSAxKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcXVlcnkgPSBgSU5TRVJUIElOVE8gc3RvY2tzIChcInByb2R1Y3RfaWRcIiwgXCJjb3VudFwiKSBWQUxVRVMgKCcke3Byb2R1Y3RJZH0nLCAke2NvdW50fSlgO1xuICAgIGF3YWl0IHRoaXMuZGJDbGllbnQuZXhlY3V0ZTx7IGlkOiBzdHJpbmcgfT4ocXVlcnkpO1xuICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/resources/product/product.service.ts\n");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@middy/core");

/***/ }),

/***/ "@middy/http-json-body-parser":
/*!***********************************************!*\
  !*** external "@middy/http-json-body-parser" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@middy/http-json-body-parser");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/get-products-by-id/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;