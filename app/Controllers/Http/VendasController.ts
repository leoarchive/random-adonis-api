import { schema } from '@ioc:Adonis/ClassValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Veiculo from 'App/Models/Veiculo'

import Venda from 'App/Models/Venda'

export default class VendasController {
  public async store({ request, response }: HttpContextContract) {
    const taskSchema = schema.create({
      vendedorId: schema.number(),
      veiculoId: schema.number(),
      valorVenda: schema.string(),
    })

    const body = await request.validate({ schema: taskSchema })

    const venda = await Venda.create(body)

    const veiculo = await Veiculo.findBy('id', body.veiculoId)

    if (veiculo?.status) {
      veiculo.status = false
      await veiculo.save()
    } else {
      return {
        message: 'Veículo indisponível',
      }
    }

    response.status(201)

    return {
      message: 'Venda realizada com sucesso!',
      data: venda,
    }
  }
}
