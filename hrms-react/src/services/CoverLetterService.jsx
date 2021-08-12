import axios from "axios";

export default class CoverLetterService {

    addCoverLetter(coverLetter) {
        return axios.post(`http://localhost:8080/api/coverletters/addCoverLetter`, coverLetter)
    }

    updateCoverLetter(coverLetter) {
        return axios.put(`http://localhost:8080/api/coverletters/updateCoverLetter`, coverLetter)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/coverletters/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}