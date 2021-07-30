import axios from "axios";

export default class EmployerService {
    
    getEmployers() {
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getByMailIsVerifyTrue() {
        return axios.get("http://localhost:8080/api/employers/getByMailIsVerifyTrue")
    }

    updateEmployer(employerUpdate) {
        return axios.put(`http://localhost:8080/api/employers/updateEmployer`, employerUpdate)
    }
}