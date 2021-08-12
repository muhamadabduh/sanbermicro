import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        name: 'M Abduh',
        profession: 'Admin',
        role: 'admin',
        email: 'abduh@mail.com',
        password: 'abduh123'
      },
      {
        name: 'Iqbal',
        profession: 'Web Developer',
        role: 'student',
        email: 'iqbal@mail.com',
        password: 'iqbal123'
      }
    ])
  }
}
