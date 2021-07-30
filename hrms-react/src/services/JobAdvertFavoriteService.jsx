import axios from "axios";

export default class JobAdvertFavoriteService {

    addFavorite(advertId, unemployedId) {
        return axios.post(`http://localhost:8080/api/jobAdvertFavorites/addFavorite?advertId=${advertId}&unemployedId=${unemployedId}`)
    }

    deleteFavorite(favoriteId) {
        return axios.delete(`http://localhost:8080/api/jobAdvertFavorites/deleteFavorite?favoriteId=${favoriteId}`)
    }

    getByUnemployedId(unemployedId) {
        return axios.get(`http://localhost:8080/api/jobAdvertFavorites/getByUnemployed?unemployedId=${unemployedId}`)
    }
}