"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createContact = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield app_1.prisma.contact.create({
        data: payload,
    });
    return contact;
});
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const contactToDelete = yield app_1.prisma.contact.delete({
        where: {
            id: id,
        },
    });
    return contactToDelete;
});
const updateContact = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ payload });
    const contactToUpdate = yield app_1.prisma.contact.update({
        data: payload,
        where: {
            id: id,
        },
    });
    console.log({ contactToUpdate });
    if (!contactToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No contact found');
    }
    return contactToUpdate;
});
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield app_1.prisma.contact.findMany();
    return contacts;
});
exports.ContactService = {
    createContact,
    deleteContact,
    updateContact,
    getAllContacts,
};
