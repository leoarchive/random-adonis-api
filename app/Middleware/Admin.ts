import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { Exception } from '@adonisjs/core/build/standalone'
import { GuardsList } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PerfilAcesso } from 'App/Enums/perfilAcesso.enum'

export default class Admin {
  protected async authenticate(auth: HttpContextContract['auth'], guards: (keyof GuardsList)[]) {
    /**
     * Hold reference to the guard last attempted within the for loop. We pass
     * the reference of the guard to the "AuthenticationException", so that
     * it can decide the correct response behavior based upon the guard
     * driver
     */
    let guardLastAttempted: string | undefined

    for (let guard of guards) {
      guardLastAttempted = guard

      if (await auth.use(guard).check()) {
        /**
         * Instruct auth to use the given guard as the default guard for
         * the rest of the request, since the user authenticated
         * succeeded here
         */
        auth.defaultGuard = guard
        return true
      }
    }

    /**
     * Unable to authenticate using any guard
     */
    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      guardLastAttempted
    )
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    customGuards: (keyof GuardsList)[]
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    const guards = customGuards.length ? customGuards : [auth.name]
    await this.authenticate(auth, guards)

    const perfilAcesso = auth.use().user['$attributes'].perfilAcesso

    if (Number(perfilAcesso) !== PerfilAcesso.admin) {
      throw new Exception('Unauthorized access', 403)
    }

    await next()
  }
}
