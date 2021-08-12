import axios from "axios";

export default class EducationService {

    addEducation(education) {
        return axios.post(`http://localhost:8080/api/educations/addEducations`, education)
    }

    updateEducation(educationId, education) {
        return axios.put(`http://localhost:8080/api/educations/updateEducations?educationId=${educationId}`, education)
    }

    deleteEducation(educationId) {
        return axios.delete(`http://localhost:8080/api/educations/deleteEducations?educationId=${educationId}`)
    }

    getByUnemployedIdOrderByGraduatedDate(unemployedId) {
        return axios.get(`http://localhost:8080/api/educations/getByUnemployedIdOrderByGraduatedDate?unemployedId=${unemployedId}`)
    }
}