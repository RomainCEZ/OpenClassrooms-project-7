import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Req, ForbiddenException, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthenticationGuard } from '../../auth/guard/authentication.guard';

@Controller('api/posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UseGuards(AuthenticationGuard)
    @Post()
    async createPost(@Request() req) {
        await this.postsService.create({ ...req.body, author: req.user.username, authorId: req.user.id });
    }

    @Get()
    async getAllPosts() {
        const allPosts = await this.postsService.findAll();
        return allPosts
    }

    @Get(':postId')
    async getPostById(@Param('postId') postId: string) {
        const post = await this.postsService.findOne(postId);
        return post
    }

    @UseGuards(AuthenticationGuard)
    @Patch(':postId')
    async updatePostById(@Param('postId') postId: string, @Request() req) {
        const post = await this.postsService.findOne(postId)
        if ((req.user.id && req.user.id === post.authorId) || (req.user.role && req.user.role === "admin")) {
            return await this.postsService.update(postId, { ...req.body });
        }
        throw new ForbiddenException("Requête non autorisée !")
    }

    @UseGuards(AuthenticationGuard)
    @Delete(':postId')
    async deletePostById(@Param('postId') postId: string, @Req() req) {
        const post = await this.postsService.findOne(postId)
        if ((req.user.id && req.user.id === post.authorId) || (req.user.role && req.user.role === "admin")) {
            return await this.postsService.delete(postId);
        }
        throw new ForbiddenException("Requête non autorisée !")
    }

    @UseGuards(AuthenticationGuard)
    @Post(':postId/like')
    async like(@Request() req, @Param('postId') postId: string) {
        if (req.body.like === 1) {
            await this.postsService.like(req.user.id, postId)
        }
        if (req.body.like === -1) {
            await this.postsService.dislike(req.user.id, postId)
        }
    }

}
