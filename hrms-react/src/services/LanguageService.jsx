import axios from "axios";

export default class LanguageService {
    addLanguage(language) {
        return axios.post(`http://localhost:8080/api/languages/addLanguage`, language)
    }
    
    deleteLanguage(languageId) {
        return axios.delete(`http://localhost:8080/api/languages/deleteLanguage?languageId=${languageId}`)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/languages/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}