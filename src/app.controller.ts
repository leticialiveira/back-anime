import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { CreateUsersBody } from './dtos/create-users-body';
import { CreatePostVideoBody } from './dtos/create-post-video-body';
import { PostVideoRepository } from './repositories/post-video-repository';
import { AnimeRepository } from './repositories/anime-repository';
import { CreateAnimeBody } from './dtos/create-anime-body';
import { EditAnimeBody } from './dtos/edit-anime-body';

@Controller('app')
export class AppController {
  constructor(
    private prisma: PrismaService,
    private users: UsersRepository,
    private postVideo: PostVideoRepository,
    private anime: AnimeRepository,
  ) {}

  // @Get('anime')
  // async listAnime() {
  //   const filePath = path.join(__dirname, 'utils', 'anime.json');
  //   const animeData = fs.readFileSync(filePath, 'utf-8');
  //   const anime = JSON.parse(animeData);
  //   return anime;
  // }

  @Post('user')
  async postUsers(@Body() body: CreateUsersBody) {
    const { user, email, phone, password } = body;
    await this.users.create(user, email, phone, password);
    return { message: 'Criado com sucesso!' };
  }

  @Get('users')
  async Users() {
    return {
      data: await this.prisma.users.findMany({
        orderBy: {
          user: 'asc',
        },
      }),
    };
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
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

    const deletUser = this.prisma.users.delete({
      where: {
        id: id,
      },
    });

    await this.prisma.$transaction([deleteVideo, deleteAnime, deletUser]);

    return { message: 'Deletado com sucesso!' };
  }

  @Get('user/:id')
  async searchUser(@Param('id') id: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        user: true,
        email: true,
        phone: false,
        password: false,
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

    if (!user) return { message: 'Usuário não encontrado!' };
    return user;
  }

  @Put('user')
  async editUser(@Body() body: EditAnimeBody){
    const data = body
    const result = await this.prisma.users.update({
      where:{
        id: data.id
      }
    })
  }

  @Post('postVideo')
  async PostVideo(@Body() body: CreatePostVideoBody) {
    const { comment, authorId } = body;
    await this.postVideo.create(comment, authorId);
    return { message: 'Criado com sucesso!' };
  }

  @Post('anime')
  async Anime(@Body() body: CreateAnimeBody) {
    const { img, name, category, genero, description, userId } = body;
    await this.anime.create(img, name, category, genero, description, userId);
    return { message: 'Criado com sucesso!' };
  }

  @Get('animes')
  async Animes() {
    return {
      data: await this.prisma.anime.findMany({
        orderBy: {
          name: 'asc',
        },
      }),
    };
  }
}
