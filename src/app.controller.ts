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
import { EditUserBody } from './dtos/edit-user-body';

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

  //criar usuario
  @Post('user')
  async postUsers(@Body() body: CreateUsersBody) {
    const { user, email, phone, password } = body;
    await this.users.create(user, email, phone, password);
    return { message: 'Criado com sucesso!' };
  }

  //editar usuario
  @Put('user')
  async editUser(@Body() body: EditUserBody){
    const { id, user, password, phone, email } = body
    return await this.users.put(id, user, email, phone, password)

  }

  //deletar usuario
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    await this.users.delete(id)
    return { message: 'Deletado com sucesso!' };
  }

  //pegar pelo id
  @Get('user/:id')
  async searchUser(@Param('id') id: string) {
    return await this.users.findUnique(id);

  }

  //pegar todos os usuarios
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

  //criar comentario
  @Post('postVideo')
  async PostVideo(@Body() body: CreatePostVideoBody) {
    const { comment, authorId } = body;
    await this.postVideo.create(comment, authorId);
    return { message: 'Criado com sucesso!' };
  }

  //criar anime
  @Post('anime')
  async Anime(@Body() body: CreateAnimeBody) {
    const { img, name, category, genero, description, userId } = body;
    await this.anime.create(img, name, category, genero, description, userId);
    return { message: 'Criado com sucesso!' };
  }

  //pegar todos os animes
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
