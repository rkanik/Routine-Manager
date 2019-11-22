
import axios from 'axios'

const DEV = axios.create({
   baseURL:"http://localhost:3600/v1/"
})

const PRO = axios.create({
   baseURL:""
})

export default DEV