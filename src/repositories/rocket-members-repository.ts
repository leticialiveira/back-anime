export abstract class RocketMembersRepository {
    abstract create(name: string, memberFunction: string):Promise <void>
    // como o metodo vai ser assincrono ele é obrigado a devolver uma promise.
    // void => pq n vai retornar nd
}