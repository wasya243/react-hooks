import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://ec2-18-219-251-82.us-east-2.compute.amazonaws.com/api'
})

export default axiosInstance