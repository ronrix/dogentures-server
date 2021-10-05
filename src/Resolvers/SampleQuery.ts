import {
    Query,
    Resolver,
    ObjectType,
    Field, 
    ID,
//    UseMiddleware,
    Ctx,
} from "type-graphql";
import { Profile } from "../entity/Profile";
//import { isAuth } from "../isAuth";
import { Context } from "../Context";

import {getRepository} from 'typeorm';

@ObjectType()
class UsersResponse {
    @Field(() => ID)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String, { nullable: true })
    avatar: string;

    @Field(() => Date)
    bdate: Date;

    @Field(() => Boolean)
    online: boolean;

    @Field(() => Date, {nullable: true})
    date: Date;
}

@Resolver()
export class Get {

    profileEntity = getRepository(Profile);

    @Query(() => [UsersResponse])
    async getUsers(@Ctx() { req }: Context) {
        console.log(req.cookies);
        console.log(this.profileEntity);
        const users = await this.profileEntity.find();
        console.log(users);
        return users;
    }

}
