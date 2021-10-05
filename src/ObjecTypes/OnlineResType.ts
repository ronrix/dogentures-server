import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class OnlineResponse {
    @Field(() => Int)
    id: number;

    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => String, { nullable: true })
    avatar: string;

    @Field(() => Boolean, { nullable: true })
    online: boolean;
}
