import { Resolver, Query, ObjectType, Field, Arg, UseMiddleware } from 'type-graphql';

import { verify } from 'jsonwebtoken';
import { isAuth } from '../isAuth';

@ObjectType()
class VerifyTokenRes {
    @Field(() => Boolean)
    ok: boolean;
}

@Resolver()
export class VerifyToken {
    @Query(() => VerifyTokenRes)
    @UseMiddleware(isAuth)
    verifyToken(@Arg('token', () => String!) token: string) {
        try {
            // verifying token
            verify(String(token), process.env.ACCESS_TOKEN_SECRET!);
        } catch(e) {
            console.log("error: ", e);
            return {ok: false}
        }
        return {ok: true}
    }
}
