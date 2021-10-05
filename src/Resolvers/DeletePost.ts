import { isAuth } from "../isAuth";
import { Profile } from "../entity/Profile";
import { Resolver, Mutation, Arg, ID, UseMiddleware } from "type-graphql";
import { Posts } from "../entity/Post";

import {getRepository, ObjectID} from 'typeorm';
import {ObjectId} from 'mongodb';

@Resolver()
export class DeletePost {

    profileEntity = getRepository(Profile);
    postsEntity = getRepository(Posts);

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("id", () => ID) id: ObjectID,
    ) {
        try {
            await this.postsEntity.delete({ id: new ObjectId(id) });
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
