import axios from "axios";

export default class TechnologyService {
    addTechnology(technology) {
        return axios.post("http://localhost:8080/api/technologies/addTechnology", technology)
    }
    deleteTechnology(technologyId) {
        return axios.delete(`http://localhost:8080/api/technologies/deleteTechnology?technologyId=${technologyId}`)
    }
    updateTechnology(technology, technologyId) {
        return axios.put(`http://localhost:8080/api/technologies/updateTechnology?technologyId=${technologyId}`, technology)
    }
    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/technologies/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}