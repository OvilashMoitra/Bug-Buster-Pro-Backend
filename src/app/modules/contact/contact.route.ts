import Express from 'express';
import { ContactController } from './contact.controller';

export const ContactRouter = Express.Router();

ContactRouter.post('/create-contact', ContactController.createContact);

ContactRouter.get('/', ContactController.getAllContacts);

ContactRouter.patch('/:id', ContactController.updateContact);

ContactRouter.delete('/:id', ContactController.deleteContact);
