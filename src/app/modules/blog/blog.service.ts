/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Blog } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';



const createBlog = async (payload: Blog) => {
    const blog = await prisma.blog.create({
        data: payload,
        include: {
            blogAuthor: true
        }
    },
    )

    return blog;
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
