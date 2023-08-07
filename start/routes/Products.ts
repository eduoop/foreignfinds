/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/products', 'Products/Main.store').middleware("auth")
Route.get('/products', 'Products/Main.index')
Route.get('/products/:id', 'Products/Main.show')
Route.put('/products/:id', 'Products/Main.update').middleware("auth")
