import { diskStorage } from 'multer';

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
};

export const multerConfig = {
    dest: 'images',
    storage : diskStorage({
        destination: "./images",
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0].split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            callback(null, `${name}${Date.now()}.${extension}`);
        }
    })
}
