import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reserva from 'App/Models/Reserva'

export default class ReservasController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const venda = await Reserva.create(body)

    response.status(201)

    return {
      message: 'Reserva realizada com sucesso!',
      data: venda,
    }
  }
}
