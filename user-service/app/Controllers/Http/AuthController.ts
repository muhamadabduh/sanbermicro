import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
    public async register({ request, response }: HttpContextContract) {
        try {
            const payload = await request.validate(UserValidator);
            const user = await User.create({ ...payload, role: 'student' })
            return response.created({ status: 'success', data: { id: user.id } })
        } catch (error) {
            if (error.messages) {
                return response.badRequest({ status: 'error', message: error.messages })
            } else {
                return response.badRequest({ status: 'error', message: error.message })
            }
        }
    }

    public async login({ request, response, auth }: HttpContextContract) {
        try {
            const email = request.input('email')
            const password = request.input('password');

            if (!email || !password) {
                return response.badRequest({ status: 'error', message: 'email and password are required' })
            }

            const data = await auth.attempt(email, password)
            return response.ok({ status: 'success', data })
        } catch (error) {
            console.log(error)
            return response.badRequest({ status: 'error', message: error.message })
        }
    }
}
