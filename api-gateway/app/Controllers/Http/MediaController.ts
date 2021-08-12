import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import apiAdapter from '../../../start/routes/apiAdapter';
import Env from '@ioc:Adonis/Core/Env';
const urlMedia = Env.get('URL_SERVICE_MEDIA')

const api = apiAdapter(urlMedia)

export default class MediaController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const media = await api.post('/media', request.body())
            return response.ok(media.data)
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                return response.serviceUnavailable({ status: 'error', message: 'service unavailable' })
            } else {
                const { status, data } = error.response
                return response.status(status).json(data)
            }
        }
    }

    public async index({ response }: HttpContextContract) {
        try {
            const media = await api.get('/media')
            return response.ok(media.data)
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                return response.serviceUnavailable({ status: 'error', message: 'service unavailable' })
            } else {
                const { status, data } = error.response
                return response.status(status).json(data)
            }
        }
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            const deleteMedia = await api.delete(`/media/${params.id}`)
            return response.ok(deleteMedia.data)
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
