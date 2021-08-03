import axios from "axios";

export default class UnemployedService {
    
    getUnemployeds() {
        return axios.get("http://localhost:8080/api/unemployeds/getall")
    }

    getMailIsVerifyTrue() {
        return axios.get("http://localhost:8080/api/unemployeds/getMailIsVerifyTrue")
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/unemployeds/getByUnemployedId?unemployedId=${unemployedId}`)
    }

    createCv(unemployedId) {
        return axios.get(`http://localhost:8080/api/unemployeds/createCv?unemployedId=${unemployedId}`)
    }
}