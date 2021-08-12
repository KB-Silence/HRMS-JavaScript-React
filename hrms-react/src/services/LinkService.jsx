import axios from "axios";

export default class LinkService {

    addLink(link) {
        return axios.post(`http://localhost:8080/api/links/addLink`, link)
    }

    updateLink(link) {
        return axios.put(`http://localhost:8080/api/links/updateLink`, link)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/links/getByUnemployed?unemployedId=${unemployedId}`)
    }
}