import axios from "axios";

export default class EducationService {
    addEducation(education) {
        return axios.post("http://localhost:8080/api/educations/addEducations", education)
    }

    deleteEducation(educationId) {
        return axios.delete(`http://localhost:8080/api/educations/deleteEducations?educationId=${educationId}`)
    }

    getByUnemployedIdOrderByGraduatedDate(unemployedId) {
        return axios.get(`http://localhost:8080/api/educations/getByUnemployedIdOrderByGraduatedDate?unemployedId=${unemployedId}`)
    }
}