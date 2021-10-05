import { isAuth } from "../isAuth";
import { Query, Resolver, UseMiddleware } from "type-graphql";

import { Profile } from "../entity/Profile";
import { OnlineResponse } from "../ObjecTypes/OnlineResType";

@Resolver()
export class GetOnlines {
    @Query(() => [OnlineResponse])
    @UseMiddleware(isAuth)
    async getOnlineUsers() {
        return await Profile.find({relations: ['user']});
    }
}
