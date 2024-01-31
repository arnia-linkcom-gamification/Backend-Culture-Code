import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJewelDto } from './dto/create-jewel.dto';
//import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Jewel } from './entities/jewel.entity';

@Injectable()
export class JewelsService {
  constructor(
    @InjectRepository(Jewel)
    private jewelRepository: Repository<Jewel>,
  ) {}

  async create(createJewelDto: CreateJewelDto) {
    try {
      const jewelAlready = await this.jewelRepository.exists({
        where: { type: createJewelDto.type },
      });

      if (jewelAlready) {
        throw new ConflictException('This jewel already exists');
      }

      const newJewel = this.jewelRepository.create(createJewelDto);

      switch (createJewelDto.type) {
        case 'Joia da Alma':
          newJewel.habilities =
            'A joia da alma permite acessar a essência de cada indivíduo, seu portador tem o poder de analisar, compreender e lidar com os próprios sentimentos e dos outros.';
          break;
        case 'Joia da Mente':
          newJewel.habilities =
            'O poder dessa joia está na possibilidade de conseguir acessar diretamente os pensamentos de qualquer ser, transformando ideias em palavras, com assertividade na transmissão e receptividade das informações.';
          break;
        case 'Joia da Realidade':
          newJewel.habilities =
            'A joia da realidade traz consigo a incrível habilidade de adaptar a realidade de acordo com o aquilo que se espera, seu portador consegue tornar real a cultura da organização, se adaptando e comprometendo com as questões ética da empresa.';
          break;
        case 'Joia do Espaço':
          newJewel.habilities =
            'Esta joia traz consigo a capacidade de estar em diversos lugares ao mesmo tempo, estimula o interesse por mudanças, variedades de experiências e novas ideias.';
          break;
        case 'Joia do Poder':
          newJewel.habilities =
            'Esta poderosa joia trás consigo uma fonte infinita de energia para lidar com o próximo, aquele que a possui demonstra a capacidade de lidar com diversos perfis de pessoas, bem como proatividade e empatia.';
          break;
        case 'Joia do Tempo':
          newJewel.habilities =
            'Nesta joia está a possibilidade de total domínio sobre a dimensão temporal, aquele que a possui tem a capacidade de lidar com grande volume de demandas dentro dos prazos estabelecidos, mantendo atenção aos detalhes, tendo em vista o alcance de resultados.';
          break;
        default:
          throw new NotFoundException('This jewel not exist');
      }

      await this.jewelRepository.save(newJewel);

      return newJewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findByType(type: string) {
    try {
      const jewelAlready = await this.jewelRepository.findOne({
        where: {
          type,
        },
      });
      return jewelAlready;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all jewels`;
  }

  async findOne(id: number) {
    try {
      const jewel = await this.jewelRepository.findOneOrFail({
        where: { id },
      });
      if (!jewel) {
        throw new NotFoundException('Jewel not found');
      }
      return jewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  // update(id: number, updateJewelDto: UpdateJewelDto) {
  //   return `This action updates a #${id} jewel`;
  // }

  remove(id: number) {
    return `This action removes a #${id} jewel`;
  }
}
