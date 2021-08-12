import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import apiAdapter from '../../../start/routes/apiAdapter';
import Env from '@ioc:Adonis/Core/Env';
const urlUser = Env.get('URL_SERVICE_USER')

const api = apiAdapter(urlUser)

export default class UsersController {
    public async register({ request, response }: HttpContextContract) {
        try {
            const user = await api.post('/users/register', request.body())
            return response.created(user.data)
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                return response.serviceUnavailable({ status: 'error', message: 'service unavailable' })
            } else {
                const { status, data } = error.response
                return response.status(status).json(data)
            }
        }
    }
}
