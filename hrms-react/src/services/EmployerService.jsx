import axios from "axios";

export default class EmployerService {

    getAllEmployers() {
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getByMailIsVerifyTrue() {
        return axios.get("http://localhost:8080/api/employers/getByMailIsVerifyTrue")
    }

    getByUserId(employerId) {
        return axios.get(`http://localhost:8080/api/employers/getByUserId?userId=${employerId}`)
    }

    updateEmployer(employerUpdate) {
        return axios.put(`http://localhost:8080/api/employers/updateEmployer`, employerUpdate)
    }
}