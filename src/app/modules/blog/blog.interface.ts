/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Blog } from '@prisma/client';

export interface ICreateBlog extends Blog {
    blogTag: string;
}
