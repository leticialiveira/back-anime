import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { randomUUID } from 'node:crypto';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTeamMemberBody } from './dtos/create-team-member-body';
import { RocketMembersRepository } from './repositories/rocket-members-repository';

@Controller('app')
export class AppController {
  constructor(
    private rocketMembersRepository: RocketMembersRepository
  ){}
  // export class AppController {
    //   constructor(private prisma: PrismaService) {}
    
    @Post('mensagem')
    // async getHello(@Body() body:any) {
      async getHello(@Body() body:CreateTeamMemberBody) {
        const { name, 'function':memberFunction } = body;
        
        await this.rocketMembersRepository.create(name, memberFunction)
        //o controler ta dependendo do rocketMembersRepository
        
        // const member = await this.prisma.rocketTeamMember.create({
          //   data: {
            //       id: randomUUID(),
            //       // name: "Guilherme Capitão", 
            //       name,
            //       // function: "Alcançar coisas altas",
            //       function: memberFunction,
            //   }
            // });
            // return { member };
          }
          
          @Get('anime')
          async listAnime() {
            const filePath = path.join(__dirname, 'utils', 'anime.json');
            const animeData = fs.readFileSync(filePath, 'utf-8');
            const anime = JSON.parse(animeData);
            return anime;
          }
        }
        