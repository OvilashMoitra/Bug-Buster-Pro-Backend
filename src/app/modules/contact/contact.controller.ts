/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { ContactService } from './contact.service';

const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactInfo = req.body;
        const contact = await ContactService.createContact(contactInfo);
        if (!contact) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating contact');
        }
        sendResponse(res, 'Contact created successfully', contact);
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.id;
        const contactToDelete = await ContactService.deleteContact(contactId);
        if (!contactToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting contact');
        }
        sendResponse(res, 'Contact deleted successfully', contactToDelete);
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contactId = req.params.id;
        const contactInfo = req.body;
        const contactToUpdate = await ContactService.updateContact(contactId, contactInfo);
        if (!contactToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating contact');
        }
        sendResponse(res, 'Contact updated successfully', contactToUpdate);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await ContactService.getAllContacts();
        if (!contacts) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching contacts');
        }
        sendResponse(res, 'Contacts fetched successfully', contacts);
    } catch (error) {
        next(error);
    }
};

export const ContactController = {
    createContact,
    deleteContact,
    updateContact,
    getAllContacts,
};
