/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/products-categories', 'ProductsCategory/Main.index')
Route.post('/products-categories', 'ProductsCategory/Main.store').middleware("adminAuth")
Route.get('/products-categories/:id', 'ProductsCategory/Main.show')
Route.put('/products-categories/:id', 'ProductsCategory/Main.update').middleware("adminAuth")
Route.delete('/products-categories/:id', 'ProductsCategory/Main.destroy').middleware("adminAuth")

