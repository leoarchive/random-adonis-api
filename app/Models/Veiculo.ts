import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Venda from './Venda'
import Reserva from './Reserva'

export default class Veiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public marca: string

  @column()
  public modelo: string

  @column()
  public ano: string

  @column()
  public km: string

  @column()
  public cor: string

  @column()
  public chassi: string

  @column()
  public compra: string

  @column()
  public status: boolean

  @hasOne(() => Venda)
  public venda: HasOne<typeof Venda>

  @hasOne(() => Reserva)
  public reserva: HasOne<typeof Reserva>
}
