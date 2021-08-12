import { cuid } from '@ioc:Adonis/Core/Helpers';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Media from 'App/Models/Media'
import fspromise from 'fs/promises'
import base64Img from 'node-base64-img'
import isBase64 from 'is-base64'


export default class MediaController {
    public async store({ request, response }: HttpContextContract) {

        const image = request.input('image')
        if (!isBase64(image, { mimeRequired: true })) {
            return response.badRequest({ status: 'error', message: 'invalid base64' })
        }

        const filepath = await base64Img(image, './public/images', cuid())
        const fileName = filepath.path.split('/').pop()
        const media = await Media.create({ image: `images/${fileName}` })

        return response.created({
            status: 'success',
            data: {
                id: media.id,
                image: `${request.host()}/images/${fileName}`
            }
        });

    }


    public async index({ request, response }: HttpContextContract) {
        const media = await Media.query().select(['id', 'image'])
        const mappedMedia = media.map((m) => {
            m.image = `${request.host()}/${m.image}`
            return m
        })

        return response.ok({
            status: 'success',
            data: mappedMedia
        })
    }

    public async destroy({ params, response }: HttpContextContract) {
        try {
            const media = await Media.find(params.id)
            if (media) {
                await fspromise.unlink(`./public/${media.image}`)
                await media.delete()
                return response.ok({ status: 'success', message: 'deleted' })
            } else {
                return response.badRequest({ status: 'error', message: 'media not found' })
            }
        } catch (error) {
            return response.badRequest({ status: 'error', message: error.message })
        }

    }

}
