import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PerfilAcesso } from 'App/Enums/perfilAcesso.enum'
import Funcionario from 'App/Models/Funcionario'
import Hash from '@ioc:Adonis/Core/Hash'

export default class FuncionarioAdminSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Funcionario.createMany([
      {
        nome: 'admin',
        email: 'admin@random.com.br',
        password: await Hash.make('root'),
        perfilAcesso: PerfilAcesso.admin,
      },
    ])
  }
}
