/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FAQ } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';



const createFAQ = async (payload: FAQ) => {
    const faq = await prisma.fAQ.create({
        data: payload,
        include: {
            auth: true
        }
    },
    )

    return faq;
};



const deleteFAQ = async (payload: string) => {
    const faqToDeleted = await prisma.fAQ.delete({
        where: {
            id: payload
        }
    })

    return faqToDeleted;
};

const updateFAQ = async (
    payload: Partial<FAQ>,
    id: string
) => {

    const faqToUpdate = await prisma.fAQ.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            auth: true
        }
    })

    if (!faqToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No faq found');
    }

    return faqToUpdate;
};


const getAllFAQ = async () => {
    const faqs = await prisma.fAQ.findMany({
        include: {
            auth: true
        }
    })

    return faqs;
}

export const FAQService = {
    createFAQ,
    deleteFAQ,
    updateFAQ,
    getAllFAQ,
};
