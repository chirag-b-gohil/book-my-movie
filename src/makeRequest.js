const apiURL = "http://localhost:8085/api/v1";

const makeRequest = (method, endpoint, data, headers) => new Promise(function (resolve, reject) {
    let url = apiURL + endpoint;
    if(endpoint.indexOf("http") > -1) {
        url = endpoint;
    }
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
            resolve({
                ok: true,
                xhr,
                statusCode: xhr.status,
                data: xhr.response && xhr.response !== "" && JSON.parse(xhr.response),
            });
        } else {
            resolve({
                ok: false,
                xhr,
                statusCode: xhr.status,
                data: xhr.response && xhr.response !== "" && JSON.parse(xhr.response)
            });
        }
    };
    xhr.onerror = function () {
        reject({
            ok: false,
            xhr,
            statusCode: xhr.status,
            statusText: xhr.statusText
        });
    };
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if (headers) {
       Object.keys(headers).forEach((key) => {
           xhr.setRequestHeader(key, headers[key]);
       })
    }
    xhr.send(data ? JSON.stringify(data) : null);
});

export default makeRequest;