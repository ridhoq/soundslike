export default function APIHelper() {
    this.logIn = function () {
        // todo
    }
}

APIHelper.checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error
};

APIHelper.fetchJSON = function (url, options) {
    return fetch(url, options)
        .then(APIHelper.checkStatus)
        .then(response => response.json()
            .then(responseJSON => {
                return {
                    status: response.status,
                    headers: response.headers,
                    json: responseJSON
                };
            })
        )
        .catch(error => {
            if (typeof error.response.json === 'function') {
                return error.response.json().then(errorResponseJSON => {
                    return {
                        status: error.response.status,
                        headers: error.response.headers,
                        json: errorResponseJSON
                    };
                });
            }
        });
};

APIHelper.signUp = function (data) {
    return APIHelper.fetchJSON("/api/users/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
};
