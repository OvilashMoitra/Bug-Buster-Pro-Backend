/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Contact } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';

const createContact = async (payload: Contact) => {
    const contact = await prisma.contact.create({
        data: payload,
    });

    return contact;
};

const deleteContact = async (id: string) => {
    const contactToDelete = await prisma.contact.delete({
        where: {
            id: id,
        },
    });

    return contactToDelete;
};

const updateContact = async (id: string, payload: Partial<Contact>) => {
    const contactToUpdate = await prisma.contact.update({
        data: payload,
        where: {
            id: id,
        },
    });

    if (!contactToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No contact found');
    }

    return contactToUpdate;
};

const getAllContacts = async () => {
    const contacts = await prisma.contact.findMany();

    return contacts;
};

export const ContactService = {
    createContact,
    deleteContact,
    updateContact,
    getAllContacts,
};
