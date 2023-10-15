import { BlogTag } from '@prisma/client';
import { prisma } from '../../../app';

const createTag = async (payload: BlogTag) => {
    const role = await prisma.blogTag.create({
        data: payload
    })
    return role;
};

const getAllTag = async () => {
    const tags = await prisma.blogTag.findMany()
    return tags;
};

const updatedTag = async (payload: Partial<BlogTag>, id: string) => {

    const updatedTag = await prisma.blogTag.update({
        data: payload,
        where: {
            id
        }
    })

    return updatedTag;
};



export const BlogTagService = {
    createTag,
    getAllTag,
    updatedTag
};
