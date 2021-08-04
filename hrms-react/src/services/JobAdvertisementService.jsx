import axios from "axios";

export default class JobAdvertisementService {
    addJobAdvertisements(jobAdvertisement) {
        return axios.post("http://localhost:8080/api/jobAdvertisements/addAdvertisement", jobAdvertisement)
    }

    getByApprovedAndFilter(pageNo, pageSize, advertFilter) {
        return axios.post(`http://localhost:8080/api/jobAdvertisements/getByApprovedAndFilter?pageNo=${pageNo}&pageSize=${pageSize}`,advertFilter)
    }

    changeAdvertisementStatus(advertId, status) {
        return axios.put(`http://localhost:8080/api/jobAdvertisements/changeAdvertisementStatus?advertId=${advertId}&status=${status}`)
    }

    getJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAll")
    }

    getByAdvertStatusTrue() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getByAdvertStatusTrue")
    }

    getByAdvertStatusAndSortedCreatedDate() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getByAdvertStatusAndSorted")
    }

    getByAdvertIsConfirmed(status) {
        return axios.get(`http://localhost:8080/api/jobAdvertisements/getByAdvertIsConfirmed?status=${status}`)
    }

    getByAdvertStatusTrueAndEmployerId(employerId) {
        return axios.get(`http://localhost:8080/api/jobAdvertisements/getByAdvertStatusTrueAndEmployerId?employerId=${employerId}`)
    }
}