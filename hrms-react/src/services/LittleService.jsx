import axios from "axios"

export default class LittleService {

    getEmploymentTypes() {
        return axios.get("http://localhost:8080/api/employmentTypes/getAll");
    }

    getEmploymentTimes() {
        return axios.get("http://localhost:8080/api/employmentTimes/getAll");
    }

    getCities() {
        return axios.get("http://localhost:8080/api/cities/getAllCities");
    }

    getPositions() {
        return axios.get("http://localhost:8080/api/positions/getall");
    }
}