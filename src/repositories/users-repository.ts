export abstract class UsersRepository {
    abstract create(user: String, email: String, phone: Number, password: String):Promise<void>
    abstract put(id: string, user: string, email: string, phone: bigint, password:string):Promise<{ message: string }>
    abstract delete(id:string):Promise<{message:string}>
    abstract findUnique(id:string):Promise<{data?:object; message?:string}>
}