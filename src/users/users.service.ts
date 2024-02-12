import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createClient } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UploadImageDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersJewels } from '../jewels/entities/users-jewels.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) {
    try {
      const emailExist = await this.usersRepository.exists({
        where: { email: payload.email },
      });
      if (emailExist) {
        throw new ConflictException('An user with this email already exists.');
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      const { ...newUserWithoutPass } = newUser;
      delete newUserWithoutPass.password;

      return newUserWithoutPass;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async upload(image: UploadImageDto) {
    try {
      // const configService = new ConfigService();
      const supabase = createClient(
        // configService.get<string>('SUPABASE_URL'),:
        // configService.get<string>('SUPABASE_KEY'),
        'https://hoptdcgqdfewpiilghky.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcHRkY2dxZGZld3BpaWxnaGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc0NDMwMzEsImV4cCI6MjAyMzAxOTAzMX0.w8uNHAK5deNtVmW3wKZ7EnLrFZxJ8jMp3bG31-bPrNA',
        {
          auth: {
            persistSession: false,
          },
        },
      );

      const data = await supabase.storage
        .from('arnia')
        // .from(configService.get<string>('SUPABASE_DB_NAME'))
        .upload(image.originalname, image.buffer, {
          upsert: true,
        });

      // const { data } = await supabase.storage
      //   .from('arnia')
      //   // .from(configService.get<string>('SUPABASE_DB_NAME'))
      //   .getPublicUrl(image.filename);

      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find({
        relations: ['jewels.jewel', 'products'],
      });

      const returnedUsers = users.map((user) => {
        const jewels = this.groupJewelsByType(user.jewels);

        const jewelsWithCount = Object.values(jewels);

        return {
          ...user,
          jewels: jewelsWithCount,
        };
      });

      return returnedUsers;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        withDeleted: true,
        relations: ['jewels.jewel', 'products'],
      });
      if (!user) {
        throw new NotFoundException(`User with id:${id} not found.`);
      }

      const jewels = this.groupJewelsByType(user.jewels);
      const jewelsWithCount = Object.values(jewels);

      const userWithCountJewels = { ...user, jewels: jewelsWithCount };

      return userWithCountJewels;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    try {
      await this.findOne(id);
      if (payload.confirmPassword && !payload.password) {
        throw new BadRequestException("Passwords don't matches.");
      }

      if (payload.email) {
        const emailExist = await this.usersRepository.exists({
          where: { email: payload.email },
        });
        if (emailExist) {
          throw new BadRequestException(
            'An user with this email already exists.',
          );
        }
      }

      if (payload.password) {
        const user = await this.findOne(id);
        await this.usersRepository.save(Object.assign(user, payload));
        return await this.findOne(id);
      }

      await this.usersRepository.update(id, payload);
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async softDelete(id: number) {
    try {
      await this.findOne(id);
      return await this.usersRepository.softDelete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async restore(id: number) {
    try {
      await this.findOne(id);
      return await this.usersRepository.restore(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  private groupJewelsByType(jewels: UsersJewels[]) {
    return jewels.reduce((previous, current) => {
      const jewel = current.jewel.type;
      previous[jewel] = previous[jewel]
        ? { ...previous[jewel], count: previous[jewel].count + 1 }
        : { ...current.jewel, count: 1 };
      return previous;
    }, {});
  }
}
