/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'Users/Register.store')
Route.get('/users/register/:key', 'Users/Register.show')
Route.put('/users/register', 'Users/Register.update')

Route.post('/users/forgot-password', 'Users/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'Users/ForgotPassword.show')
Route.put('/users/forgot-password', 'Users/ForgotPassword.update')

Route.put('/users/:id', 'Users/Main.update').middleware('auth')

Route.put('/users-avatar', 'Users/Avatar.update').middleware('auth')

Route.get('/users-ads', 'Users/Products.index').middleware('auth')
