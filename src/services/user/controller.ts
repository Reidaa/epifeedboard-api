import {PrismaClient, User} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getAll(): Promise<User[]> {
    return await prisma.user.findMany();
}

export async function getByUsername(username: string): Promise<User | null> {
    return await prisma.user.findOne({
        where: {
            username
        }
    });
}

export async function getByID(id: string): Promise<User | null> {
    return await prisma.user.findOne({
        where: {
            id: Number(id)
        }
    });
}

export async function updateLanguage(id: number, language: string): Promise<User | null> {
    return await prisma.user.update({
        where: {
            id: id
        },
        data: {
            language: language
        }
    });
}

export async function getByEmail(email: string): Promise<User | null> {
    return await prisma.user.findOne({
        where: {
            email
        }
    });
}

export async function create(email: string, username: string, password: string): Promise<User> {
    password = await bcrypt.hash(password, 8);
    return await prisma.user.create({
        data: {
            email,
            username,
            password,
        }
    });
}

export async function deleteByID(id: string): Promise<User> {
    return await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
}
