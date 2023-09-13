const headersIP = ["x-client-ip", "x-forwarded-for"];

function getIpFromHeaders(requestHeaders) {
    let clientIP = null;
    headersIP.forEach((item) => {
        if (requestHeaders[item]) {
            clientIP = Array.isArray(requestHeaders[item]) ? requestHeaders[item][0] : requestHeaders[item];
        }
    });
    return clientIP;
}

function getIpFromReqSocketAndRaw(request) {
    if (request.socket.remoteAddress) {
        return request.socket.remoteAddress;
    } else if (request.rawHeaders) {
        return request.rawHeaders[request.rawHeaders.findIndex((elem) => elem === "X-Forwarded-For") + 1];
    }
    return null
}

export default function getClientIP(request) {
    try {
        return getIpFromHeaders(request.headers) || getIpFromReqSocketAndRaw(request);
    } catch (e) {
        return null;
    }
}