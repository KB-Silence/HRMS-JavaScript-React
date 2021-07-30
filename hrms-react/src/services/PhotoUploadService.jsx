import axios from "axios";

export default class PhotoUploadService {
    uploadPhoto(unemployedId, multipartFile) {
        return axios.post(`http://localhost:8080/api/photos/uploadPhoto?unemployedId=${unemployedId}`, multipartFile)
    }

    updatePhoto(unemployedId, multipartFile) {
        return axios.put(`http://localhost:8080/api/photos/updatePhoto?unemployedId=${unemployedId}`,multipartFile)
    }

    deletePhoto(photoId) {
        return axios.delete(`http://localhost:8080/api/photos/deletePhoto?photoId=${photoId}`)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/photos/getByUnemployedId?unemployedId=${unemployedId}`)
    }
}