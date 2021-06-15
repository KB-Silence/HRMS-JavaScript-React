import axios from "axios";

export default class JobAdvertisementService {
    getJobAdvertisements() {
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAll")
    }

    addJobAdvertisements(jobAdvertisement) {
        return axios.post("http://localhost:8080/api/jobAdvertisements/addAdvertisement", jobAdvertisement)
    }
}