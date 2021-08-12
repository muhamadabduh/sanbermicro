import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/', 'MediaController.store').as('media.store');
    Route.get('/', 'MediaController.index').as('media.index');
    Route.delete('/:id', 'MediaController.destroy').as('media.destroy');
}).prefix('media')