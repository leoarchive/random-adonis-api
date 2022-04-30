import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Veiculo from 'App/Models/Veiculo'
import { DateTime } from 'luxon'

export default class VeiculosController {
  public async store({ request, response }: HttpContextContract) {
    const taskSchema = schema.create({
      marca: schema.string(),
      modelo: schema.string.optional(),
      ano: schema.string.optional(),
      km: schema.string(),
      cor: schema.string(),
      chassi: schema.string(),
      compra: schema.string(),
      status: schema.boolean.optional(),
    })

    const body = await request.validate({ schema: taskSchema })

    !body.status && (body.status = true)

    const veiculo = await Veiculo.create(body)

    response.status(201)

    return {
      message: 'Veículo criado com sucesso!',
      data: veiculo,
    }
  }

  public async index() {
    const funcionario = await Veiculo.all()

    return {
      data: funcionario,
    }
  }

  public async show({ params }: HttpContextContract) {
    const veiculo = await Veiculo.findOrFail(params.id)
    return {
      data: {
        ...veiculo['$attributes'],
        dataFormatadaCreate: DateTime.fromISO(veiculo.createdAt.toISO()).toFormat('dd/LL/yyyy'),
        dataFormatadaUpdate: DateTime.fromISO(veiculo.updatedAt.toISO()).toFormat('dd/LL/yyyy'),
      },
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const veiculo = await Veiculo.findOrFail(params.id)

    await veiculo.delete()

    return {
      message: 'Veículo excluído com sucesso!',
      data: veiculo,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body()

    const veiculo = await Veiculo.findOrFail(params.id)

    veiculo.marca = body.marca
    veiculo.modelo = body.modelo
    veiculo.ano = body.ano
    veiculo.km = body.km
    veiculo.cor = body.cor
    veiculo.chassi = body.chassi
    veiculo.compra = body.compra
    veiculo.status = body.status

    await veiculo.save()

    return {
      message: 'Veículo atualizado com sucesso!',
      data: veiculo,
    }
  }

  public async porStatus({ params }: HttpContextContract) {
    const veiculo = await Veiculo.query().where('status', params.status)

    return {
      data: veiculo,
    }
  }
}
