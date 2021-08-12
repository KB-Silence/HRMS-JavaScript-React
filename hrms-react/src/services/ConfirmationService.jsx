import axios from "axios";

export default class ConfirmationService {

    confirmEmployers(employeeId, employerId) {
        return axios.post(`http://localhost:8080/api/confirmingEmployer/confirmEmployers?employeeId=${employeeId}&employerId=${employerId}`)
    }

    confirmUpdate(employeeId, employerId, status) {
        return axios.post(`http://localhost:8080/api/confirmingUpdates/verifyUpdate?employeeId=${employeeId}&employerId=${employerId}&status=${status}`)
    }

    confirmAdvertisement(advertId, employeeId, status) {
        return axios.post(`http://localhost:8080/api/confirmingJobAdverts/confirmJobAdverts?advertId=${advertId}&employeeId=${employeeId}&status=${status}`)
    }

    getByEmployerIsConfirmed() {
        return axios.get(`http://localhost:8080/api/confirmingEmployer/getByEmployerIsConfirmed`)
    }

    getByApproveStatus() {
        return axios.get(`http://localhost:8080/api/confirmingUpdates/getByApproveStatus`)
    }

    getByAdvertIsConfirmed() {
        return axios.get(`http://localhost:8080/api/confirmingJobAdverts/getByAdvertIsConfirmed`)
    }

}