import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Funcionario from 'App/Models/Funcionario'
import { v4 as uuidv4 } from 'uuid'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'
import Venda from 'App/Models/Venda'
import Reserva from 'App/Models/Reserva'
import { DateTime } from 'luxon'

export default class FuncionariosController {
  private avatarValidate = {
    types: ['image'],
    size: '1mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const taskSchema = schema.create({
      cpf: schema.string.optional(),
      nome: schema.string(),
      email: schema.string(),
      avatar: schema.string.optional(),
      biografia: schema.string.optional(),
      password: schema.string({}, [rules.minLength(8)]),
      perfilAcesso: schema.enum([1, 2]),
    })

    const messages = {
      minLength: '{{ field }} deve conter no mínimo {{ options.minLength }} caracteres.',
    }

    const body = await request.validate({ schema: taskSchema, messages: messages })

    const avatar = request.file('avatar', this.avatarValidate)

    if (avatar) {
      const avatarName = `${uuidv4()}.${avatar.extname}`

      await avatar.move(Application.tmpPath('uploads'), {
        name: avatarName,
      })

      body.avatar = avatarName
    }

    body.password = await Hash.make(body.password)

    const funcionario = await Funcionario.create(body)

    response.status(201)

    return {
      message: 'Funcionário criado com sucesso!',
      data: funcionario,
    }
  }

  public async index() {
    const funcionario = await Funcionario.all()

    return {
      data: funcionario,
    }
  }

  public async show({ params }: HttpContextContract) {
    const funcionario = await Funcionario.findOrFail(params.id)

    return {
      data: {
        ...funcionario['$attributes'],
        dataFormatadaCreate: DateTime.fromISO(funcionario.createdAt.toISO()).toFormat('dd/LL/yyyy'),
        dataFormatadaUpdate: DateTime.fromISO(funcionario.updatedAt.toISO()).toFormat('dd/LL/yyyy'),
      },
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const funcionario = await Funcionario.findOrFail(params.id)

    await funcionario.delete()

    return {
      message: 'Funcionário excluído com sucesso!',
      data: funcionario,
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body()

    const funcionario = await Funcionario.findOrFail(params.id)

    funcionario.cpf = body.cpf
    funcionario.nome = body.nome
    funcionario.email = body.email
    funcionario.biografia = body.biografia

    if (funcionario.avatar !== body.avatar || !funcionario.avatar) {
      const avatar = request.file('avatar', this.avatarValidate)

      if (avatar) {
        const avatarName = `${uuidv4()}.${avatar.extname}`

        await avatar.move(Application.tmpPath('uploads'), {
          name: avatarName,
        })

        funcionario.avatar = avatarName
      }
    }

    await funcionario.save()

    return {
      message: 'Funcionário atualizado com sucesso!',
      data: funcionario,
    }
  }

  public async vendas({ params }: HttpContextContract) {
    const veiculo = await Venda.query().where('vendedorId', params.id)

    return {
      data: veiculo,
    }
  }

  public async reservas({ params }: HttpContextContract) {
    const veiculo = await Reserva.query().where('vendedorId', params.id)

    return {
      data: veiculo,
    }
  }
}
