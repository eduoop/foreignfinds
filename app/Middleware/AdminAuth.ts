import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminAuth {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const user = await auth.use('api').authenticate()

      if (user.role !== 'admin') {
        return response.status(401).json({ message: 'Este recurso é apenas para administradores.' })
      }
    } catch (error) {
      return response.status(401).json({ message: 'É obrigatório o envio de um token válido.' })
    }
    await next()
  }
}
