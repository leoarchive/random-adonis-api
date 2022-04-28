import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Veiculos extends BaseSchema {
  protected tableName = 'veiculos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('marca')
      table.string('modelo')
      table.string('ano')
      table.string('km')
      table.string('cor')
      table.string('chassi')
      table.string('compra')
      table.boolean('status')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
