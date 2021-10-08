import { Resolver, Mutation, Arg, UseMiddleware, ID, Ctx } from 'type-graphql';
import { getMongoRepository, ObjectID } from 'typeorm';
import { Posts } from '../entity/Post';
import { Comments } from '../entity/Comments';
import { isAuth } from '../isAuth';
import { ObjectId } from 'mongodb';
import { Context } from '../Context';

//
@Resolver()
export class React {

    postsEntity = getMongoRepository(Posts);
    commentsEntity = getMongoRepository(Comments);

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async reaction(@Arg("id", () => ID) postId: ObjectID, @Ctx() {payload}: Context) {
        try {
            //const post: any = await Posts.findOne({id: new ObjectId(postId) });
            const post: any = await this.postsEntity.find(new ObjectId(postId));
            console.log(post);
            //const comment: any = await Comments.findOne({userId: new ObjectId(userId) });
            const comment: any = await this.commentsEntity.find({userId: String(payload?.userId)});
            console.log(comment);

            // check if the user has already reacted to the post
            if(comment[0]?.isReacted) {
                throw "you already reacted to this post";
            }
            // udpate the users comment to reacted
            await getMongoRepository(Comments).updateMany({'userId': {'$exists': String(payload?.userId)} }, {'$set': { 'isReacted': true}});

            if(post?.hearts >= 1) {
                // increment the hearts reaction
                await Posts.update({id: new ObjectId(postId)}, {hearts: post.hearts + 1});
            } else {
                await Posts.update({id: new ObjectId(postId)}, {hearts: 1});
            }
                    

        } catch(error) {
            console.log(error);
            return false;
        }

        return true;
    }
}
