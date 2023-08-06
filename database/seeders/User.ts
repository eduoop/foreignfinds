import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    const user = User
    await user.firstOrCreate({
      email: 'admin@admin.com',
      password: 'admin@admin.com',
      role: 'admin',
      name: 'Eduardo Moraes',
    })
  }
}
