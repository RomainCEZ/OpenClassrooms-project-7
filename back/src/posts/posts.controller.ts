import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Res } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

@Controller("images")
export class ImagesController {
  @Get(":imagename")
  findImage(@Param("imagename") imagename: string, @Res() res: any) {
    return res.sendFile(join(process.cwd(), "images/" + imagename))
  }
}

class PostPipe {
  transform(value: string) {
    return JSON.parse(value)
  }
}

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, @Body("data", PostPipe) createPostDto: CreatePostDto) {
    if (file) {
      createPostDto = {
        ...createPostDto,
        imageUrl: `http://192.168.0.10:8000/images/${file.filename}`
      }
    }
    this.postsService.create(createPostDto);
    return "Post créé !"
  }
  
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
