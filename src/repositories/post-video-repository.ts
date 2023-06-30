export abstract class PostVideoRepository {
    abstract create(comment: String, authorId: String):Promise<void>
}