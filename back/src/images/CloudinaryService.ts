import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary'

@Injectable()
export class CloudinaryService {
    async uploadImage(userId: string, image: string) {
        return await v2.uploader.upload(image, { public_id: userId, width: 150, height: 150, crop: "fill" })
    }
}