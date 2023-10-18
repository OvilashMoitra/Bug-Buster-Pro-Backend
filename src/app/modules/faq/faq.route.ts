import Express from 'express';
import { FAQController } from './faq.controller';



export const FAQRouter = Express.Router();

FAQRouter.post('/create-faq', FAQController.createFAQ);

FAQRouter.get('/', FAQController.getAllFAQ);

FAQRouter.patch('/:id', FAQController.updateFAQ);

FAQRouter.delete('/:id', FAQController.deleteFAQ);


