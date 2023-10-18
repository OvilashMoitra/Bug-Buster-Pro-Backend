/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Blog } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';
import { ICreateBlog } from './blog.interface';



const createBlog = async (payload: ICreateBlog) => {

    const blogTag = payload.blogTag;

    // ! look for user
    const user = prisma.user.findUnique({
        where: {
            id: payload.addedBy
        }
    })
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const createBlogTransaction = await prisma.$transaction(async (tx) => {
        const blog = await tx.blog.create({
            data: {
                addedBy: payload.addedBy,
                blogContent: payload.blogContent,
                blogImage: payload.blogImage
            },
            include: {
                blogAuthor: {
                    select: {
                        email: true,
                        role: true,
                        id: true
                    }
                }
            }
        },
        )
        console.log({ blog });
        tx.blogTagToBlog.create({
            data: {
                blogId: blog.id,
                tagId: blogTag
            }
        })

        return blog;
    })
    return createBlogTransaction
};



const deleteBlog = async (payload: string) => {
    const blogDeleted = await prisma.blog.delete({
        where: {
            id: payload
        }
    })

    return blogDeleted;
};

const updateBlog = async (
    payload: Partial<Blog>,
    id: string
) => {

    const blogToUpdate = await prisma.blog.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            blogAuthor: true,
            tags: true
        }
    })

    if (!blogToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Blog found');
    }

    return blogToUpdate;
};

const getBlog = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        },
        include: {
            blogAuthor: true
        }
    })
    return blog;
}
const getAllBlog = async () => {
    const blogs = await prisma.blog.findMany({
        include: {
            blogAuthor: true,
            tags: true
        }
    })

    return blogs;
}

export const BlogService = {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlog,
    getAllBlog,
};
