import axios from "axios";

export default class PhotoUploadService {
    uploadPhoto(unemployedId, multipartFile) {
        return axios.post(`http://localhost:8080/api/photos/uploadPhoto?unemployedId=${unemployedId}`, multipartFile)
    }

    deletePhoto(unemployedId) {
        return axios.delete(`http://localhost:8080/api/photos/deletePhoto?unemployedId=${unemployedId}`)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/photos/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}