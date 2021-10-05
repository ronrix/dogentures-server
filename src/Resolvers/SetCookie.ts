import { Resolver, Mutation, ObjectType, Field, Ctx, Arg } from 'type-graphql';

import { Context } from '../Context';
import { createRefreshToken } from '../auth';
import { Profile } from '../entity/Profile';

@ObjectType()
class CookieRes {
    @Field(() => String)
    cookie: String
}

@Resolver()
export class SetCookie {
    @Mutation(() => CookieRes)
    async setCookie(@Ctx() {res}: Context, @Arg('name', () => String) name: string) {
        const user = await Profile.findOne({where: { name: name }});
        
        const token = createRefreshToken(user!.user);
        const cookie = res.cookie('session_auth', token, {httpOnly: true});

        return { cookie };
    }
}
