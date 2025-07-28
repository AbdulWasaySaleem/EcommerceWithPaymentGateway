import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const strorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ecommerce-products',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
    transformation: [{ fetch_format: 'auto', quality: 'auto' }]
  }
});

const upload = multer({ storage: strorage });

export default upload;
