import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/register', 'UsersController.register').as('users.register')
}).prefix('users')