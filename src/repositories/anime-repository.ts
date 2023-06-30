export abstract class AnimeRepository {
    abstract create(img: string,name: string,category: string,genero: string,description: string, userId: string ):Promise<void>
}