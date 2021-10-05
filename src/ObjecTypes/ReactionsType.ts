import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Reactions {
    @Field()
    likes: number;
    @Field()
    hearts: number;
}
