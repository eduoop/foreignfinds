/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import UserKey from './UserKey'
import Product from './Product'
import File from './File'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public phone: string

  @column()
  public role: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'avatar'})
  })
  public avatar: HasOne<typeof File>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
