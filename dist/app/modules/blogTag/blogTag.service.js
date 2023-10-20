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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTagService = void 0;
const app_1 = require("../../../app");
const createTag = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield app_1.prisma.blogTag.create({
        data: payload
    });
    return role;
});
const getAllTag = () => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield app_1.prisma.blogTag.findMany();
    return tags;
});
const updatedTag = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTag = yield app_1.prisma.blogTag.update({
        data: payload,
        where: {
            id
        }
    });
    return updatedTag;
});
exports.BlogTagService = {
    createTag,
    getAllTag,
    updatedTag
};
