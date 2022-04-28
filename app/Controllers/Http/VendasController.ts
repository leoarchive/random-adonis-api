import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Venda from 'App/Models/Venda'

export default class VendasController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const venda = await Venda.create(body)

    response.status(201)

    return {
      message: 'Venda realizada com sucesso!',
      data: venda,
    }
  }
}
