import { isAuth } from "../isAuth";
import { Resolver, Query, Arg, Int, UseMiddleware } from "type-graphql";
import { Posts } from "../entity/Post";
import { GetPostType } from "../ObjecTypes/GetPostType";

@Resolver()
export class GetPost {
    @Query(() => GetPostType)
    @UseMiddleware(isAuth)
    async getSinglePost(@Arg("id", () => Int) id: number) {
        const post = await Posts.findOne({ id }, { relations: ['user', 'comments', 'comments.user'] });
        return post;
    }
}
