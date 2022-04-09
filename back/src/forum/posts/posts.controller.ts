import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from '../../auth/guard/authentication.guard';

class ParseJsonPipe {
    transform(value: string) {
        return JSON.parse(value)
    }
}

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UseGuards(AuthenticationGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createPost(@UploadedFile() file: Express.Multer.File, @Body("data", ParseJsonPipe) createPostDto: CreatePostDto, @Req() req) {
        if (file) {
            createPostDto.imageName = `${file.filename}`
        }
        createPostDto.author = req.user.username
        createPostDto.authorId = req.user.id
        this.postsService.create(createPostDto);
    }

    @Get()
    async getAllPosts() {
        const allPosts = await this.postsService.findAll();
        const allPostsDto = allPosts.map(post => {
            if (post.imageName) {
                const postResponseDto = {
                    ...post,
                    imageUrl: `${process.env.DOMAIN_ADDRESS}/${process.env.IMAGE_FOLDER}/${post.imageName}`
                }
                delete postResponseDto.imageName
                return postResponseDto
            }
            return post
        })
        return allPostsDto
    }

    @Get(':postId')
    async getPostById(@Param('postId') postId: string) {
        const post = await this.postsService.findOne(postId);
        if (post.imageName) {
            const postResponseDto = {
                ...post,
                imageUrl: `${process.env.DOMAIN_ADDRESS}/${process.env.IMAGE_FOLDER}/${post.imageName}`
            }
            delete postResponseDto.imageName
            return postResponseDto
        }
        return post
    }

    @UseGuards(AuthenticationGuard)
    @Patch(':postId')
    @UseInterceptors(FileInterceptor('file'))
    async updatePostById(@UploadedFile() file: Express.Multer.File, @Body("data", ParseJsonPipe) updatePostDto: UpdatePostDto, @Param('postId') postId: string, @Req() req) {
        const post = await this.postsService.findOne(postId)
        if ((req.user.id && req.user.id === post.authorId) || (req.user.role && req.user.role === "admin")) {
            if (file) {
                updatePostDto.imageName = `${file.filename}`
            }
            this.postsService.update(postId, updatePostDto);
        } else {
            return "Requête non autorisée !"
        }
    }

    @UseGuards(AuthenticationGuard)
    @Delete(':postId')
    async deletePostById(@Param('postId') postId: string, @Req() req) {
        const post = await this.postsService.findOne(postId)
        if ((req.user.id && req.user.id === post.authorId) || (req.user.role && req.user.role === "admin")) {
            this.postsService.delete(postId);
        } else {
            return "Requête non autorisée !"
        }
    }
}
