import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
export default class UsersController {
    public async update({ request, response, params }: HttpContextContract) {
        try {
            const schemaUpdate = schema.create({
                name: schema.string(),
                email: schema.string({ trim: true }),
                password: schema.string({}, [rules.minLength(6)]),
                profession: schema.string.optional(),
                avatar: schema.string.optional()
            })
            const payload = await request.validate({ schema: schemaUpdate });

            const data = await User.findOrFail(params.id)
            const email = payload.email

            if (email) {
                const checkUser = await User.findBy('email', email)
                if (checkUser && email !== data.email) {
                    return response.conflict({ status: 'error', message: 'email already exist' })
                }
            }

            data.email = payload.email
            data.name = payload.name
            data.password = payload.password
            data.profession = payload.profession
            data.avatar = payload.avatar

            await data.save()
            return response.ok({ status: 'success', data })

        } catch (error) {
            if (error.messages) {
                return response.badRequest({ status: 'error', message: error.messages })
            }

            return response.badRequest({ status: 'error', message: error.message, test: 'wadaw' })
        }
    }

    public async show({ params, response }: HttpContextContract) {
        const data = await User.findOrFail(params.id)
        return response.ok({ status: 'success', data })
    }

    public async index({ response, request }: HttpContextContract) {
        const filter = request.qs()
        const user_ids = filter.user_ids || []
        let data = await User.all();
        if (user_ids.length) {
            data = await User.query().whereIn('id', user_ids)
        }

        return response.ok({ status: 'success', data })
    }
}
