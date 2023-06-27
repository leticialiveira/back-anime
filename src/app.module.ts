import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { RocketMembersRepository } from './repositories/rocket-members-repository';
import { PrismaRocketMembersRepository } from './repositories/prisma/prisma-rocket-members-repository';
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
    provide: RocketMembersRepository,
    //toda vez que alguem solicitar uma class do tipo 'rocket...'
    useClass: PrismaRocketMembersRepository
    //eu vou usar a class 'prismarocketmem...'
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