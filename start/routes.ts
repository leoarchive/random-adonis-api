/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', async ({ auth, request }) => {
    const email = request.input('email')
    const password = request.input('password')

    await auth.use('web').attempt(email, password)
    return {
      message: 'Logado com sucesso!',
    }
  })
  Route.get('/veiculos/porStatus/:status', 'VeiculosController.porStatus')
}).prefix('/api')

Route.group(() => {
  Route.post('/vender', 'VendasController.store')
  Route.post('/reservar', 'ReservasController.store')
  Route.resource('/veiculos', 'VeiculosController').apiOnly()
})
  .prefix('/api')
  .middleware(['auth'])

Route.group(() => {
  Route.get('/funcionarios/vendas/:id', 'FuncionariosController.vendas')
  Route.get('/funcionarios/reservas/:id', 'FuncionariosController.reservas')
  Route.resource('/funcionarios', 'FuncionariosController').apiOnly()
})
  .prefix('/api')
  .middleware(['admin'])
