import { Role } from '@prisma/client';
import { prisma } from '../../../app';

const createRole = async (payload: Role) => {
    const role = await prisma.role.create({
        data: payload
    })
    return role;
};

const getAllRole = async () => {
    const tags = await prisma.role.findMany()
    return tags;
};

const updateRole = async (payload: Partial<Role>, id: string) => {

    const updatedTag = await prisma.role.update({
        data: payload,
        where: {
            id
        }
    })

    return updatedTag;
};



export const RoleService = {
    createRole,
    getAllRole,
    updateRole
};
