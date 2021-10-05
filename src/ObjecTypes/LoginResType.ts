import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class LoginResponse {
    @Field(() => String, { nullable: true })
    accessToken?: string;

    @Field(() => String, { nullable: true })
    msg?: string;

    @Field(() => Boolean, { nullable: true })
    ok?: boolean;

    @Field(() => String, { nullable: true })
    avatar?: string;

    @Field(() => String!, { nullable: true })
    name?: string;

    @Field(() => Boolean!, { nullable: true })
    online?: boolean;
}
