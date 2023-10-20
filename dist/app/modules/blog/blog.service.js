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
exports.BlogService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogTag = payload.blogTag;
    // ! look for user
    const user = app_1.prisma.user.findUnique({
        where: {
            id: payload.addedBy
        }
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const createBlogTransaction = yield app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const blog = yield tx.blog.create({
            data: {
                blogTitle: payload.blogTitle,
                addedBy: payload.addedBy,
                blogContent: payload.blogContent,
                blogImage: payload.blogImage
            },
            include: {
                blogAuthor: {
                    select: {
                        email: true,
                        role: true,
                        id: true
                    }
                }
            }
        });
        console.log({ blogTag });
        const blogTagToBlog = blogTag.map(tag => {
            return {
                "blogId": blog.id,
                "tagId": tag
            };
        });
        const blogTagRefernceCreate = yield tx.blogTagToBlog.createMany({
            data: blogTagToBlog
        });
        console.log({ blogTagRefernceCreate });
        return blog;
    }));
    return createBlogTransaction;
});
const deleteBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blogDeleted = yield app_1.prisma.blog.delete({
        where: {
            id: payload
        }
    });
    return blogDeleted;
});
const updateBlog = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogToUpdate = yield app_1.prisma.blog.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            blogAuthor: true,
            tags: true
        }
    });
    if (!blogToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No Blog found');
    }
    return blogToUpdate;
});
const getBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield app_1.prisma.blog.findUnique({
        where: {
            id: id
        },
        include: {
            blogAuthor: true,
            tags: {
                include: {
                    tag: true
                }
            }
        }
    });
    return blog;
});
const getAllBlog = () => __awaiter(void 0, void 0, void 0, function* () {
    // const blogs = await prisma.blogTagToBlog.findMany({
    //     include: {
    //         blog: true,
    //         tag: true
    //     }
    // })
    const blogs = yield app_1.prisma.blog.findMany({
        include: {
            tags: {
                include: {
                    tag: true
                }
            }
        }
    });
    return blogs;
});
exports.BlogService = {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlog,
    getAllBlog,
};
