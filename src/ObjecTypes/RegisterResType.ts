// import { User } from "../entity/User";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class RegisterResponse {
    @Field(() => String, { nullable: true })
    accessToken: string;

    @Field(() => Boolean!)
    ok?: boolean;

    @Field(() => String, { nullable: true })
    msg: string;

    @Field(() => String, { nullable: true })
    avatar?: string;

    @Field(() => String!, { nullable: true })
    name?: string;

    @Field(() => Boolean!, { nullable: true })
    online?: boolean;
}
