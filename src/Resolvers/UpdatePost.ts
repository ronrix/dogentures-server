import { Posts } from "../entity/Post";
import {
    Resolver,
    Mutation,
    Arg,
    ID,
    Ctx,
    UseMiddleware,
    ObjectType,
    Field,
} from "type-graphql";
import { isAuth } from "../isAuth";
import { Profile } from "../entity/Profile";
import {getRepository, ObjectID} from "typeorm";
import {Context} from '../Context';

@ObjectType()
class UpdatedPostResponse {
    @Field()
    ok: boolean;

    @Field()
    msg: string;
}

@Resolver()
export class UpdatePost {

    postsEntity = getRepository(Posts);
    profileEntity = getRepository(Profile);

    @Mutation(() => UpdatedPostResponse)
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => ID) id: ObjectID,
        @Arg("description", () => String) description: string,
        @Ctx() {payload}: Context
    ) {
        try {

            // check if real owner of the post
            const owner = await this.postsEntity.findOne({userId: String(payload?.userId) });
            if(!owner) throw "don't be sneaky, we don't do that here";

            await this.postsEntity.update({ id: id }, { description });
        } catch (error) {
            return { ok: false, msg: "can't find the post to update" };
        }
        return { ok: true, msg: "successfully updated the post" };
    }
}
