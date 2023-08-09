/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'files'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enu('file_category', ["avatar", "product_image"]).notNullable()
      table.integer('owner_id').notNullable()
      table.string('file_name').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
