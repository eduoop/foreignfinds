/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/related-ads/:id', 'RelatedAds/Main.index')
Route.get('/seller-ads/:id', 'RelatedAds/Main.show')
