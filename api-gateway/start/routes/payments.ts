import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', async ({ response }) => {
        return response.ok({ status: "payments" })
    })
}).prefix('payments')