import { Request, Response } from "express";
import {ObjectID} from 'typeorm';

export interface Context {
    req: Request;
    res: Response;
    payload?: { userId: ObjectID };
}
