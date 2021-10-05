import { User } from "../entity/User";
import { Arg, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class RefreshToken {
    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("id", () => Int) id: number) {
        // whenever we want to revoke our token, we can just get to this endpoint and increment the tokenVersion
        // for cookie expiration
        await getConnection()
            .getRepository(User)
            .increment({ id }, "tokenVersion", 1);

        return true;
    }
}
