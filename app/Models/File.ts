import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileName: string

  @column()
  public fileCategory: 'avatar' | 'product_image'

  @column()
  public ownerId: number

  @column()
  public fileUrl: string
}
