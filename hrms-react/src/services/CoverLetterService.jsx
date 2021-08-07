import axios from "axios";

export default class CoverLetterService {

    addCoverLetter(coverLetter) {
        return axios.post(`http://localhost:8080/api/coverletters/addCoverLetter`, coverLetter)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/coverletters/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}