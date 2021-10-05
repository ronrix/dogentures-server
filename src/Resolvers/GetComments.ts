import {Resolver, Query, Arg, Field, ObjectType, ID} from 'type-graphql';
import {Comments} from '../entity/Comments';
import {Profile} from '../entity/Profile';

import {getMongoRepository, ObjectID} from 'typeorm';
import {ObjectId} from 'mongodb';

@ObjectType()
class CommentRes {
    @Field(() => ID, {nullable: true})
    id: ObjectID;

    @Field(() => ID, {nullable: true})
    userId: ObjectID;

    @Field(() => String, {nullable: true})
    comment: string;

    @Field(() => ID, {nullable: true})
    postId: ObjectID;

    @Field(() => Profile)
    commentersInfo: Profile;

    @Field(() => Date, {nullable: true})
    created_at: Date;
}

@Resolver()
export class GetComments {

    commentEntity = getMongoRepository(Comments);

    @Query(() => [CommentRes])
    async getComments(@Arg('postId', () => ID) postId: ObjectID) {
       return await this.commentEntity.find({postId: new ObjectId(postId) });
       /* 
        // get the commenters info 
        const allUsers = await Profile.find();
        console.log("comments: ", comments);

        let commentersInfo: any = [];

        comments.forEach((commenter) => {
            allUsers.forEach((user)=> {
                console.log("ids: ", commenter?.userId, user.id);
                if(new ObjectId(commenter?.userId) === new ObjectId(user.id)) {
                    console.log('equal....');
                    commentersInfo.push({comments,  user});
                }
            });
        });
        console.log(comments, commentersInfo)*/

    }
}
