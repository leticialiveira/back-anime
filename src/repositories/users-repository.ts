export abstract class UsersRepository {
    abstract create(user: String, email: String, phone: Number, password: String):Promise<void>
}