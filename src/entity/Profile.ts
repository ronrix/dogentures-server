import { Field, ObjectType, ID } from "type-graphql";
import {
    Entity,
    BaseEntity,
    Column,
    ObjectIdColumn,
    CreateDateColumn,
    ObjectID,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("profile")
export class Profile extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column("varchar")
    name: string;

    @Field({nullable: true})
    @Column("varchar", { nullable: true })
    avatar: string;

    @Field()
    @Column("date", { nullable: true })
    bdate: Date;

    @Field()
    @Column("bool", { default: true })
    online: boolean;

    @Field()
    @Column("varchar")
    bioDesc: string;

    @Field(() => User)
    @Column(() => User)
    user: User;

    @Field()
    @CreateDateColumn()
    date: Date;
}
