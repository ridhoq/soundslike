
export default class APIHelper {
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    signUp(data) {
        fetch("/api/users", {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/jsob"
            }
        })
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            // set state here
        }).catch(error => {
            // set error state here
        });
    }

    logIn(data) {

    }
}