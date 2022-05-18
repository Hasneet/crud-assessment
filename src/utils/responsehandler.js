class ResponseHandler {

    sendResponse(res, data = {}, statusCode = 500, message = null) {
        data.message = message;
        return res.status(statusCode).send(data);
    }
}

export default ResponseHandler;