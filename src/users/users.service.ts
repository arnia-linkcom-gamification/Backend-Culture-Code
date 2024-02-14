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
import { CreateUserDto, UploadImageDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersJewels } from '../jewels/entities/users-jewels.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto, image: UploadImageDto) {
    try {
      const emailExist = await this.usersRepository.exists({
        where: { email: payload.email },
      });
      if (emailExist) {
        throw new ConflictException('An user with this email already exists.');
      }

      payload.profileImg = undefined;
      payload.profileImg = image ? await this.upload(image) : null;

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

  async upload(file: UploadImageDto) {
    try {
      const configService = new ConfigService();
      const supabaseBucket = configService.get<string>('SUPABASE_DB_NAME');
      const supabase = createClient(
        configService.get<string>('SUPABASE_URL'),
        configService.get<string>('SUPABASE_KEY'),
        {
          auth: {
            persistSession: false,
          },
        },
      );
      const name = file.originalname.split('.')[0];
      const extension = file.originalname.split('.')[1];
      const sanitizedName = name.replace(/[^a-z0-9]/gi, '-');
      const newFileName =
        sanitizedName.split(' ').join('_') + '_' + Date.now() + '.' + extension;

      const imageData = await supabase.storage
        .from(supabaseBucket)
        .upload(newFileName, file.buffer, {
          upsert: true,
        });

      const image = await supabase.storage
        .from(supabaseBucket)
        .createSignedUrl(imageData.data.path, 365);

      const profileImg = image.data.signedUrl;

      return profileImg;
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

  async update(id: number, payload: UpdateUserDto, image?: UploadImageDto) {
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
      payload.profileImg = undefined;
      payload.profileImg = image
        ? await this.upload(image)
        : payload.profileImg;

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
      await this.usersRepository.softDelete(id);
      return;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async restore(id: number) {
    try {
      await this.findOne(id);
      await this.usersRepository.restore(id);
      return;
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
