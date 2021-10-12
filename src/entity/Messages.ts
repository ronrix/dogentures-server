import { Entity, BaseEntity, Column, ObjectIdColumn, ObjectID, CreateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class AllMessages {
    @Field(() => String)
    @Column('varchar')
    user: string;

    @Field(() => String)
    @Column('varchar')
    msg: string;
}

@ObjectType()
export class StringProfile {
    @Field(() => String)
    @Column('varchar')
    id: string;

    @Field(() => String)
    @Column('varchar')
    name: string;

    @Field(() => String)
    @Column('varchar')
    avatar: string;
}

@ObjectType()
@Entity("messages")
export class Messages extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => StringProfile)
    @Column(() => StringProfile)
    sender: StringProfile;

    @Field(() => StringProfile)
    @Column(() => StringProfile)
    receiver: StringProfile;

    @Field(() => [AllMessages])
    @Column(() => AllMessages)
    message: [AllMessages];

    @Field(() => Date)
    @CreateDateColumn()
    date: Date;
}
