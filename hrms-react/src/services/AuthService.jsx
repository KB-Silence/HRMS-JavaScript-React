import axios from "axios";

export default class AuthService {
    
    registerEmployer(confirmPassword,employer) {
        return axios.post(`http://localhost:8080/api/auth/registerEmployer?confirmPassword=${confirmPassword}`, employer)
    }

    registerUnemployed(confirmPassword, unemployed) {
        return axios.post(`http://localhost:8080/api/auth/registerUnemployed?confirmPassword=${confirmPassword}`, unemployed)
    }
    
    login(login) {
        return axios.post(`http://localhost:8080/api/auth/login`, login)
    }
}