import { Injectable } from "@nestjs/common";
import { AnimeRepository } from "../anime-repository";
import { PrismaService } from "src/database/prisma.service";
import { randomUUID } from "crypto";

@Injectable()
export class PrismaAnimeRepository implements AnimeRepository{
    constructor(
        private prisma: PrismaService
    ){}
    async create(img: string, name: string, category: string, genero: string, description: string, userId: string): Promise<void> {
        await this.prisma.anime.create({
            data:{
                id: randomUUID(),
                img,
                name,
                category,
                genero,
                description,
                userId
            }
        })
    }

}