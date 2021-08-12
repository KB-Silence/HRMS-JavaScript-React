import axios from "axios";

export default class JobExperienceService {

    addJobExperience(jobExperience) {
        return axios.post(`http://localhost:8080/api/jobexperiences/addJobExperience`, jobExperience)
    }

    updateJobExperience(experienceId, jobExperience) {
        return axios.put(`http://localhost:8080/api/jobexperiences/updateJobExperience?experienceId=${experienceId}`, jobExperience)
    }

    deleteJobExperience(jobExperienceId) {
        return axios.delete(`http://localhost:8080/api/jobexperiences/deleteJobExperience?experienceId=${jobExperienceId}`)
    }

    getByUnemployedIdOrderByLeaveDate(unemployedId) {
        return axios.get(`http://localhost:8080/api/jobexperiences/getByUnemployedIdOrderByLeaveDate?unemployedId=${unemployedId}`)
    }
}