import { Resolver, Mutation, Arg, ID, UseMiddleware } from "type-graphql";

import { Comments } from "../entity/Comments";
import { getRepository, ObjectID } from "typeorm";
import { isAuth } from "../isAuth";

@Resolver()
export class UpdateComment {

    commentsEntity = getRepository(Comments);

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateComment(@Arg("id", () => ID) commentId: ObjectID, @Arg("comment",() => String) comment: string ) {
        try {
            await this.commentsEntity.update({ id: commentId }, { comment });
        } catch(err){
            return false;
        }
        return true;
    }
}
