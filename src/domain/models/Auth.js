class Auth {
    constructor() {
        this.token = this.loadToken();
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    loadToken() {
        return localStorage.getItem('authToken');
    }
}

export default new Auth();