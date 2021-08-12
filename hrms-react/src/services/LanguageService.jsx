import axios from "axios";

export default class LanguageService {
    addLanguage(language) {
        return axios.post(`http://localhost:8080/api/languages/addLanguage`, language)
    }

    deleteLanguage(languageId) {
        return axios.delete(`http://localhost:8080/api/languages/deleteLanguage?languageId=${languageId}`)
    }

    updateLanguage(language, languageId) {
        return axios.put(`http://localhost:8080/api/languages/updateLanguage?languageId=${languageId}`, language)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/languages/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}