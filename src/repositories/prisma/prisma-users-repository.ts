import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    user: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<void> {
    await this.prisma.users.create({
      data: {
        id: randomUUID(),
        user,
        email,
        phone,
        password,
      },
    });
  }

  async put(
    id: string,
    user: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<{ message: string }> {
    await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        user,
        email,
        phone,
        password,
      },
    });

    return { message: 'Usuário editado com sucesso!' };
  }

  async delete(id: string): Promise<{ message: string }> {
    const deleteVideo = this.prisma.postVideo.deleteMany({
      where: {
        authorId: id,
      },
    });
    const deleteAnime = this.prisma.anime.deleteMany({
      where: {
        userId: id,
      },
    });
    const deleteUser = this.prisma.users.delete({
      where: {
        id,
      },
    });
    await this.prisma.$transaction([deleteVideo, deleteAnime, deleteUser]);
    return { message: 'Deletado com sucesso!' };
  }

  async findUnique(id: string): Promise<{ data?: object; message?: string }> {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        user: true,
        email: true,
        phone: false,
        password: true,
        anime: {
          select: {
            id: false,
            name: true,
            img: true,
            category: true,
            genero: true,
            description: true,
          },
        },
        postVideo: true,
        updateAt: true,
        createdAt: true,
      },
    });
    if (!user) return { message: 'Usuário não encontrado!' };
    return { data: user };
  }
}
