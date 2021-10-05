import { ObjectType, Field, Int } from "type-graphql";

import { Profile } from "../entity/Profile";
import { Comments } from "../entity/Comments";

@ObjectType()
export class GetPostType {
    @Field()
    id: number;

    @Field(() => Profile, {nullable: true})
    user: Profile;

    @Field()
    description: string;

    @Field(() => [Comments], {nullable: true})
    comments: [Comments];
    
    @Field()
    image: string;
    
    @Field(() => Int, { nullable: true } )
    heart: number;

    @Field()
    created_at: Date;
}
