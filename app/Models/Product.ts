import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import File from './File'
import ProductCategory from './ProductCategory'
import Subcategory from './Subcategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public price: number

  @column()
  public views: number

  @column()
  public previousPrice: number

  @column()
  public userId: number

  @column()
  public productCategoryId: number

  @column()
  public subcategoryId: number

  @column()
  public description: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Subcategory)
  public subcategory: BelongsTo<typeof Subcategory>

  @hasMany(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'product_image' }),
  })
  public files: HasMany<typeof File>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
