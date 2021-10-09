import { Resolver, Query, UseMiddleware, Ctx } from 'type-graphql';

import { Posts } from '../entity/Post';
import { GetAllPostsType } from '../ObjecTypes/GetAllPostsType';
import { isAuth } from '../isAuth';
import { getMongoRepository } from 'typeorm';
//import { ObjectId } from 'mongodb';

import {Context} from '../Context';

@Resolver()
export class GetAllPosts {
    postsEntity = getMongoRepository(Posts);
    @Query(() => [GetAllPostsType])
    @UseMiddleware(isAuth)
    async getAllPosts() {
        return await this.postsEntity.find();
    }

    @Query(() => [GetAllPostsType])
    @UseMiddleware(isAuth)
    async getAllPostsByUserId(@Ctx() {payload}: Context) {
        const posts = await this.postsEntity.find({userId: String(payload?.userId)});
        return posts;
    }

}
