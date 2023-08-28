/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/subcategories', 'Subcategory/Main.index')
Route.post('/subcategories', 'Subcategory/Main.store').middleware("adminAuth")
Route.get('/subcategories/:id', 'Subcategory/Main.show')
Route.put('/subcategories', 'Subcategory/Main.update').middleware("adminAuth")
Route.delete('/subcategories/:id', 'Subcategory/Main.destroy').middleware("adminAuth")

