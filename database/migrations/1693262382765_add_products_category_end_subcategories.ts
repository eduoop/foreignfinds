/* eslint-disable prettier/prettier */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('product_category_id')
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .integer('subcategory_id')
        .unsigned()
        .references('product_categories.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("category_id");
      table.dropColumn("subcategory_id");
    });
  }
}
