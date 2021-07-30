import axios from "axios"

export default class LittleService {

    /* Employment Type */
    getEmploymentTypes() {
        return axios.get("http://localhost:8080/api/employmentTypes/getAll");
    }

    /* Employment Time */
    getEmploymentTimes() {
        return axios.get("http://localhost:8080/api/employmentTimes/getAll");
    }

    /* City Service */
    getCities() {
        return axios.get("http://localhost:8080/api/cities/getAllCities");
    }

    /* Position Service */
    getPositions() {
        return axios.get("http://localhost:8080/api/positions/getall");
    }
}