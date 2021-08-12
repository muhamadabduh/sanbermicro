import axios, { AxiosInstance } from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default (baseUrl: string): AxiosInstance => axios.create({
    baseURL: baseUrl,
    timeout: Env.get('TIMEOUT')
})
