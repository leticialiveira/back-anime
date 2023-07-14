export abstract class UsersRepository {
    abstract create(user: String, email: String, phone: String, password: String):Promise<void>
    abstract put(id: string, user: string, email: string, phone: string, password:string):Promise<{ message: string }>
    abstract delete(id:string):Promise<{message:string}>
    abstract findUnique(id:string):Promise<{data?:object; message?:string}>
}