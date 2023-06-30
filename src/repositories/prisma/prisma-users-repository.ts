import { PrismaService } from "src/database/prisma.service";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
    constructor(
        private prisma: PrismaService
    ){}
    async create(user: string, email: string, phone: number, password: string): Promise<void> {
        await this.prisma.users.create({
            data:{
                id: randomUUID(),
                user,
                email,
                phone,
                password,
            }
        })
    }
    
}