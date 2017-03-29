export default class APIHelper {
    static checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            const error = new Error(response.statusText);
            response.error = error;
            throw error
        }
    }

    static signUp = (data) => {
        fetch("/api/users", {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => error.json())
    };

    logIn(data) {

    }
}