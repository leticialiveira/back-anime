import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { PostVideoRepository } from './repositories/post-video-repository';
import { PrismaPostVideoRepository } from './repositories/prisma/prisma-post-video-repository';
import { AnimeRepository } from './repositories/anime-repository';
import { PrismaAnimeRepository } from './repositories/prisma/prisma-anime-repository';
// import { AppService } from './app.service';

@Module({
  imports: [],
  //importando os modules para depois eles trabalharem juntos.
  controllers: [AppController],
  //são arquivos que recebem chamadas http
  // providers: [AppService],
  // providers:[]
  providers:[PrismaService,
  {
    provide: UsersRepository,
    useClass: PrismaUsersRepository
  },
  {
    provide: PostVideoRepository,
    useClass: PrismaPostVideoRepository
  },
  {
    provide: AnimeRepository,
    useClass: PrismaAnimeRepository
  }
  ]
  // qualquer coisa que não seja um controler 
  // exemplo= 
})
export class AppModule {}

//decorator= acoplar funcionamento em classes, funções, variaveis... 
// Envolver determinada coisa com uma função, aplicando funcionalidade 
// de uma maneira mais simples. Exemplo: @Module

// Module = formas de dividir nossa aplicação em pequenos pedaços,
// o app.module é o module principal e dentro dele podemos importar 
// todos os outros modules.