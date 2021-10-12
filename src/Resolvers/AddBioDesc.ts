import {Resolver, Mutation, Ctx, Arg, UseMiddleware} from 'type-graphql';

import {isAuth} from '../isAuth';
import {Context} from '../Context';
import {Profile} from '../entity/Profile';
import {ObjectId} from 'mongodb';

@Resolver()
export class AddBioDesc {

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addBioDesc(@Ctx() {payload}: Context, @Arg('bioDesc', () => String) bioDesc: String) {
        try {
            await Profile.update({id: new ObjectId(payload?.userId)}, {bioDesc: String(bioDesc)});
        }catch(e) {
            console.log(e);
            return false;
        }
        return true
    }
}
