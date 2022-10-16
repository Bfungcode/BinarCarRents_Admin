import axios from "axios";
const API_URL = "https://bootcamp-rent-cars.herokuapp.com/";
const user = JSON.parse(localStorage.getItem("user"))

const getAllCars = (name, category, isRented, minPrice, maxPrice, page, pageSize) => {
    const response = axios.get(`${API_URL}admin/v2/car?page=${page}&pageSize=12`, {
        params: {
            name,
            category,
            isRented,
            minPrice,
            maxPrice,
            page,
            pageSize,
        },
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response
}

const postCar = (name, category, price, status, image) => {
    return axios.post(`${API_URL}admin/car`, {
        name,
        category,
        price,
        status,
        image
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
            access_token: user.access_token,
        },
    })
}

const getCarById = (id) => {
    const response = axios.get(`${API_URL}admin/car/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const updateCarById = (id) => {
    const response = axios.put(`${API_URL}admin/car/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const deleteCar = (id) => {
    const response = axios.delete(`${API_URL}admin/car/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const getAllOrder = (from, until) => {
    const response = axios.get(`${API_URL}admin/order/reports`, {
        params: {
            from,
            until,
        },
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const getOrderById = (id) => {
    const response = axios.get(`${API_URL}admin/order/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const changeOrderStatus = (id) => {
    const response = axios.patch(`${API_URL}admin/order/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}
const deleteOrder = (id) => {
    const response = axios.delete(`${API_URL}admin/order/${id}`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}
const getListOrder = (sort, page, pageSize) => {
    const response = axios.get(`${API_URL}admin/v2/order`, {
        headers: {
            "Content-Type": "application/json",
            access_token: user.access_token,
        }
    })
    return response;
}

const adminAPI = {
    getAllCars,
    postCar,
    getCarById,
    updateCarById,
    deleteCar,
    getAllOrder,
    getOrderById,
    changeOrderStatus,
    deleteOrder,
    getListOrder,
}

export default adminAPI;