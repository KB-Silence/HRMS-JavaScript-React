import axios from "axios";

export default class LinkService {
    
    addLink(link) {
        return axios.post(`http://localhost:8080/api/links/addLink`, link)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/links/getByUnemployed?unemployedId=${unemployedId}`)
    }
}