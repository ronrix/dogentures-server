import { Resolver, Query, Field, ObjectType, Int, ID, Ctx, Arg, UseMiddleware } from "type-graphql";

import { Profile } from '../entity/Profile';
import { Posts } from '../entity/Post';

import { isAuth } from '../isAuth';
import { Context } from '../Context';
import {getMongoRepository, ObjectID} from 'typeorm';
//import {ObjectId} from 'mongodb';

@ObjectType()
class GetInfoRes {
    @Field(() => String, {nullable: true})
    avatar: string 

    @Field(() => String, {nullable: true})
    name: string

    @Field(() => Int, {nullable: true})
    posts: number

    @Field(() => String, {nullable: true})
    error?: string
}

@Resolver()
export class GetInfo  {

    profileEntity = getMongoRepository(Profile);

    @Query(() => GetInfoRes)
    @UseMiddleware(isAuth)
    async getInfo(@Ctx() {payload}: Context) {
        try { 
            const users = await Profile.find();
            
            // get the user manually
            const user = users.filter(user => String(user.id) === String(payload?.userId));

           // get the length of users posts
           const post: any = await Posts.find({ where: { userId: user[0]?.id }});

            return { 
                    avatar: user[0]?.avatar,
                    name: user[0]?.name, 
                    posts: post?.length,
                };
        } catch(e) {
            console.log(e);
            return {error: e};
        }
    }

    @Query(() => GetInfoRes)
    @UseMiddleware(isAuth)
    async getUserInfoById(@Arg('userId', () => ID) userId: ObjectID) {
        const users = await this.profileEntity.find();
        const user = users.filter((user) => String(user.id) === String(userId)); 

        return {
            avatar: user[0].avatar,
            name: user[0].name,
        };
    }

    @Query(() => [GetInfoRes])
    @UseMiddleware(isAuth)
    async getAllUsers() {
       return await this.profileEntity.find(); 
    }
}
