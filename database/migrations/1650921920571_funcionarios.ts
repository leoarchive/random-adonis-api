import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { PerfilAcesso } from 'App/Enums/perfilAcesso.enum'

export default class Funcionarios extends BaseSchema {
  protected tableName = 'funcionarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cpf')
      table.string('nome').notNullable()
      table.string('email').notNullable().unique()
      table.string('avatar')
      table.string('biografia')
      table.string('password').notNullable()
      table.enum('perfil_acesso', [1, 2]).notNullable()
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
