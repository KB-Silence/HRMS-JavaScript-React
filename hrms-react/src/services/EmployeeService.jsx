import axios from "axios";

export default class EmployeeService {

    addEmployee(employee) {
        return axios.post(`http://localhost:8080/api/employees/addEmployee`, employee)
    }

    updateEmployee(employeeId, employee) {
        return axios.put(`http://localhost:8080/api/employees/updateEmployee?employeeId=${employeeId}`, employee)
    }

    deleteEmployee(employeeId) {
        return axios.delete(`http://localhost:8080/api/employees/deleteEmployee?employeeId=${employeeId}`)
    }

    getByUserId(employeeId) {
        return axios.get(`http://localhost:8080/api/employees/getByUserId?userId=${employeeId}`)
    }

    getAllEmployee() {
        return axios.get(`http://localhost:8080/api/employees/getAll`)
    }


}