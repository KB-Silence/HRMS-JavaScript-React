import axios from "axios";

export default class TechnologyService {
    addTechnology(technology) {
        return axios.post("http://localhost:8080/api/technologies/addTechnology", technology)
    }
    deleteTechnology(technologyId) {
        return axios.delete(`http://localhost:8080/api/technologies/deleteTechnology?technologyId=${technologyId}`)
    }
    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/technologies/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}