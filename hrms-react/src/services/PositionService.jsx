import axios from "axios";

export default class PositionService {
    addPositions(position) {
        return axios.post("http://localhost:8080/api/positions/addPosition", position)
    }
}