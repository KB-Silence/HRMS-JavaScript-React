import axios from "axios";

export default class UnemployedService {
    getUnemployeds() {
        return axios.get("http://localhost:8080/api/unemployeds/getall")
    }
}