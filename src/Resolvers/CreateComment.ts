import { Resolver, Mutation, Arg, ID, Ctx, UseMiddleware } from "type-graphql";

import { Comments } from "../entity/Comments";
import { Posts } from "../entity/Post";
import { Profile } from "../entity/Profile";

import {getRepository, ObjectID} from 'typeorm';
import {Context} from '../Context';
import {isAuth} from '../isAuth';
import {ObjectId} from 'mongodb';

@Resolver()
export class CreateComment {

    postsEntity = getRepository(Posts);
    commentEntity = getRepository(Comments);
    profileEntity = getRepository(Profile);

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg("id", () => ID) postId: ObjectID,
        @Arg("comment", () => String) comment: string,
        @Ctx() { payload }: Context,
    ) {
       
        try {
            const posts: any = await this.postsEntity.find();
            
            // get the post with postId
            const post = posts.filter((post: any) => String(post.id) === String(postId));

            if(!post) throw "no post to comment";

            
            // check if the user is already reacted to the post insert isReacted to the comment data
            const isReacted: any[] | null = await Comments.find({where: { userId: new ObjectId(payload?.userId) } })
            if(isReacted.length !== 0) {
                console.log('isReacted is not null');
                if(isReacted[0].isReacted){
                    // check if isReacted is true
                    // inserting the comment to the database
                    await this.commentEntity.insert({ userId: new ObjectId(payload?.userId), comment, postId: post[0]?.id, isReacted: true });
                    return
                }
            } 
            // else don't include isReacted
            await this.commentEntity.insert({ userId: new ObjectId(payload?.userId), comment, postId: post[0]?.id });
             
 
            // get the data comment from db
            /*const comments: any = await this.commentEntity.find({ userId: payload?.userId });
            console.log(comments);
            
            // update Post with comments data
            await this.postsEntity.update({id: postId }, {comments});*/

        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }
}
