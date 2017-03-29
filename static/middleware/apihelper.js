export default function APIHelper() {
  this.logIn = function () {
    // todo
  }
}

APIHelper.checkStatus = function(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText);
    response.error = error;
    throw error
}

APIHelper.signUp = function(data) {
    fetch("/api/users", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(APIHelper.checkStatus)
    .then(response => response.json())
    .catch(error => {
      if (typeof error.json === 'function') {
        return error.json()
      }
    })
};
