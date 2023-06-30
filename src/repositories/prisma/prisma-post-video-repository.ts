import { Injectable } from "@nestjs/common";
import { PostVideoRepository } from "../post-video-repository";
import { PrismaService } from "src/database/prisma.service";
import { randomUUID } from "crypto";

@Injectable()
export class PrismaPostVideoRepository implements PostVideoRepository{
    constructor(
        private prisma: PrismaService
    ){}
    async create(comment: string, authorId: string): Promise<void> {
        await this.prisma.postVideo.create({
            data:{
                id: randomUUID(),
                comment,
                authorId,
            }
        })
    }
   
}