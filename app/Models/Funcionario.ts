import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Venda from './Venda'
import Reserva from './Reserva'
import { PerfilAcesso } from 'App/Enums/perfilAcesso.enum'

export default class Funcionario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public cpf: string

  @column()
  public nome: string

  @column()
  public email: string

  @column()
  public avatar: string

  @column()
  public biografia: string

  @column()
  public password: string

  @hasMany(() => Venda)
  public vendas: HasMany<typeof Venda>

  @hasMany(() => Reserva)
  public reservas: HasMany<typeof Reserva>

  @column()
  public perfilAcesso: PerfilAcesso
}
