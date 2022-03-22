import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

class ParseJsonPipe {
    transform(value: string) {
        return JSON.parse(value)
    }
}

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createPost(@UploadedFile() file: Express.Multer.File, @Body("data", ParseJsonPipe) createPostDto: CreatePostDto) {
        if (file) {
            createPostDto = {
                ...createPostDto,
                imageUrl: `http://192.168.0.10:8000/images/${file.filename}`
            }
        }
        this.postsService.create(createPostDto);
    }

    @Get()
    getAllPosts() {
        return this.postsService.findAll();
    }

    @Get(':postId')
    getPostById(@Param('postId') postId: string) {
        return this.postsService.findOne(+postId);
    }

    @Patch(':postId')
    @UseInterceptors(FileInterceptor('file'))
    updatePostById(@UploadedFile() file: Express.Multer.File, @Body("data", ParseJsonPipe) updatePostDto: UpdatePostDto, @Param('postId') postId: string) {
        if (file) {
            updatePostDto = {
                ...updatePostDto,
                imageUrl: `http://192.168.0.10:8000/images/${file.filename}`
            }
        }
        console.log(postId)
        this.postsService.update(+postId, updatePostDto);
    }

    @Delete(':postId')
    deletePostById(@Param('postId') postId: string) {
        this.postsService.delete(+postId);
    }
}
