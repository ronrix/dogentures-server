import {Resolver, Mutation, Arg, ID, UseMiddleware} from "type-graphql";

import { Comments } from "../entity/Comments";
import {getRepository, ObjectID} from 'typeorm';

import {isAuth} from '../isAuth';
import {ObjectId} from 'mongodb';

@Resolver()
export class DeleteComment {

    commentsEntity = getRepository(Comments);

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(@Arg('id', () => ID) id: ObjectID) {
        try {
            await this.commentsEntity.delete({id: new ObjectId(id)});
        }catch(err) {
            return false
        }
        return true
    }

}
