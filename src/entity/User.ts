import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => ID)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column("varchar")
    email: string;

    @Column("varchar")
    password: string;

    @Field()
    @Column("int", { default: 0 })
    tokenVersion: number;
}

// ObjectType - is use for graphql for types
// Field      - is for the field that we want to show in every graphql query
