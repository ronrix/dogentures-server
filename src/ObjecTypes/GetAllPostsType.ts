import {ObjectType, Field, Int, ID} from 'type-graphql';
import {ObjectID} from 'typeorm';

@ObjectType()
export class GetAllPostsType {
    @Field(() => ID)
    id: ObjectID;

    @Field(() => String)
    userId: string;

    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => String, { nullable: true })
    image: string;

    @Field(() => Int, { nullable: true })
    hearts: number;

    @Field(() => Date, {nullable: true})
    created_at: Date;

}

