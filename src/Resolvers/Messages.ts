import {Resolver, Mutation, Query, Arg, Ctx, ObjectType, Field, UseMiddleware, ID} from 'type-graphql';

import {Messages} from '../entity/Messages';
import {Profile} from '../entity/Profile';
import {isAuth} from '../isAuth';
import {Context} from '../Context';

import {ObjectID} from 'typeorm';

import {AllMessages} from '../entity/Messages';

@ObjectType()
class MessageResponse {
    @Field(() => ID)
    id: ObjectID;

    @Field(() => Profile)
    sender: Profile;

    @Field(() => Profile)
    receiver: Profile;

    @Field(() => [AllMessages])
    message: [AllMessages];

    @Field(() => Date, {nullable: true})
    date: Date;
}

@Resolver()
export class MessagesResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createMessage(@Ctx() {payload} : Context, @Arg('receiverId', () => String) receiverId: string, @Arg('msg', () => String) msg: string) {
        try {
             
            const users: any = await Profile.find()
            const user: any = users.filter((user: any) => String(user?.id) === String(payload?.userId));
            const receiver: any = users.filter((user: any) => String(user?.id) === String(receiverId));

            let flag = 0;

            // if there is already a message between the two, update and append the msgs 
            const allMsgs = await Messages.find();
            const content = allMsgs.filter((msg: any) => (
                (String(msg?.sender?.id) === String(payload?.userId) && String(msg?.receiver?.id) === String(receiverId)) 
                || (String(msg?.sender?.id) === String(receiverId) && String(msg?.receiver?.id) === String(payload?.userId))
            ));

            let appendMsg: any =  content[0]?.message;
            console.log("allMsgs: ", allMsgs);
            console.log("content: ", content);
            console.log("before appendMsg: ", appendMsg);

            let whoIsTheSender: {}[] = [];
            //if(appendMsg.message.length > content[0]?.message.length) flag = 1;

            // check if conversation already occur > append the msg to the existing table
            allMsgs.length > 0 && allMsgs.forEach((e: any) => {
                if((String(e?.sender?.id) === String(payload?.userId) && String(e?.receiver?.id) === receiverId)) {
                    console.log("first if");
                    appendMsg.push({user: user[0]?.name, msg});
                    flag = 1;
                    whoIsTheSender.push({sender: e.sender});
                }

                if((String(e?.sender?.id) === String(receiverId) && String(e?.receiver?.id) === String(payload?.userId))) {
                    console.log("second if");
                    appendMsg.push({user: user[0]?.name, msg});
                    flag = 1;
                    whoIsTheSender.push({receiver: e.receiver});
                }
            });
            console.log("after appendMsg: ", appendMsg);
            console.log("whoIsTheSender: ", whoIsTheSender);

            if(flag){
                await Messages.update(whoIsTheSender[0], {message: appendMsg});
                return true;
            }

            // make sender's and receiver's id, String!
            const newUser: {id: string, name: string, avatar: string}[] = [];
            user.forEach((i: any) => {
                newUser.push({id: String(i.id), name: i?.name,  avatar: i?.avatar});

            });
            
            const newReceiver: {id: string, name: string, avatar: string}[] = [];
            receiver.forEach((i: any) => {
                newReceiver.push({id: String(i.id), name: i?.name,  avatar: i?.avatar});

            });

            // add the msg to db
            await Messages.insert({
                sender: newUser[0], 
                receiver: newReceiver[0],
                message: [{ user: user[0]?.name, msg }] });
        } catch(e) {
            console.log("error: ", e);
            return false;
        }
        return true;
    }

    @Query(() => [MessageResponse])
    @UseMiddleware(isAuth)
    async getFilteredMsgsByUserId(@Ctx() {payload}: Context) {
        const allMsgs = await Messages.find();

        const filteredMsgs: any = allMsgs.filter((msg: any) => (
            String(msg?.sender?.id) === String(payload?.userId) || String(msg?.receiver?.id) === String(payload?.userId)
        ));
        return filteredMsgs;
    }

    @Query(() => [MessageResponse])
    @UseMiddleware(isAuth)
    async getMsgsById(@Arg('msgId', () => ID) msgId: ObjectID) {
        const msgs = await Messages.find();
        const filtered = msgs.filter((msg: any) => String(msg.id) === String(msgId));
        return filtered;
    }
}
