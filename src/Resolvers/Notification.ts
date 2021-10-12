import {Resolver, Mutation, Query, UseMiddleware, Arg, Ctx, ID, ObjectType, Field} from 'type-graphql';

import {ObjectID} from 'typeorm';
import {Posts} from '../entity/Post';
import {Profile} from '../entity/Profile';
import {Notification} from '../entity/Notifications';

import {isAuth} from '../isAuth';
import {Context} from '../Context';

@ObjectType()
class NotifResponse {
   @Field(() => ID)
   id: ObjectID;

   @Field(() => Profile)
   sendTo: Profile;

   @Field(() => Profile)
   sendFrom: Profile;

   @Field(() => String)
   isComment: string;
   
   @Field(() => String)
   isReact: string;

   @Field(() => String, {nullable: true})
   isViewed: string;

   @Field(() => Date, {nullable: true})
   created_at: Date;
}

@Resolver()
export class NotificationResolver {

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createNotif(@Ctx() {payload}: Context,
          @Arg('postId', () => ID) postId: ObjectID, 
          @Arg('isComment', () => Boolean) isComment: boolean, 
          @Arg('isReact', () => Boolean) isReact: boolean,
     ){  
        try {
           
           // get the post owner as sendTo
           const posts = await Posts.find();
           const post = posts.filter((post) => String(post.id) === String(postId));
           console.log("notifPost: ", post);

           const users: any = await Profile.find();

           const sendTo = users.filter((user: any) => String(user?.id) === String(post[0]?.userId)); 
           console.log("sendTo: ", sendTo);
           
           // get the user
           const sendFrom = users.filter((user: any) => String(user.id) === String(payload?.userId));

           console.log("sendFrom: ",sendFrom);

           // insert all to notification entity
           await Notification.insert({sendTo: sendTo[0], sendFrom: sendFrom[0], isComment, isReact});
        } catch(e) {
           console.log("notif error: ", e);
           return false
        }
        return true;
    }


    @Query(() => [NotifResponse])
    @UseMiddleware(isAuth)
    async getNotifs(@Ctx() {payload}: Context){  
       const allNotifs: any = await Notification.find();

       const specificNotifs = allNotifs.filter((notif: any) => String(notif.sendTo.id) === String(payload?.userId));

       return specificNotifs;
    }
}

