import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { UploadImageDto } from 'src/users/dto/create-user.dto';

export const uploadImage = async (file: UploadImageDto) => {
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
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/gi, '-');
    const newFileName =
      sanitizedName.split(' ').join('_') + '_' + Date.now() + '.' + extension;

    const imageData = await supabase.storage
      .from(supabaseBucket)
      .upload(newFileName, file.buffer, {
        upsert: true,
      });

    const image = await supabase.storage
      .from(supabaseBucket)
      .createSignedUrl(imageData.data.path, 31536000);

    const profileImg = image.data.signedUrl;

    return profileImg;
  } catch (error) {
    console.log(error);
    throw new HttpException(error.message, error.status);
  }
};
