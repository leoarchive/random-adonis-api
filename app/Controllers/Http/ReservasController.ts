import { schema } from '@ioc:Adonis/ClassValidator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExceptionHandler from 'App/Exceptions/Handler'
import Reserva from 'App/Models/Reserva'
import Veiculo from 'App/Models/Veiculo'

export default class ReservasController {
  public async store({ request, response }: HttpContextContract) {
    const taskSchema = schema.create({
      vendedorId: schema.number(),
      veiculoId: schema.number(),
      valorVenda: schema.string(),
    })

    const body = await request.validate({ schema: taskSchema })

    const veiculo = await Veiculo.findBy('id', body.veiculoId)

    if (veiculo?.status) {
      veiculo.status = false
      await veiculo.save()
    } else {
      return {
        message: 'Veículo indisponível',
      }
    }

    const reserva = await Reserva.create(body)

    response.status(201)

    return {
      message: 'Reserva realizada com sucesso!',
      data: reserva,
    }
  }
}
