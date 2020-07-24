import {PrismaClient, FavoritesCategories} from "@prisma/client";

const prisma = new PrismaClient();


export async function findOrCreate(category: string, id: number): Promise<FavoritesCategories[] | FavoritesCategories> {
    const favCategory = await prisma.favoritesCategories.findMany({
        where: {
            name: category,
            User: {
                id: id
            }
        },
    });

    // if fav_category is < 0 ; it means this category is not already liked

    if (favCategory.length <= 0) {
        return await prisma.favoritesCategories.create({
            data: {
                name: category,
                User: {
                    connect: {id: id}
                }
            }
        });
    } else {
        return favCategory;
    }
}

export async function getUserFavoriteCategories(id: number): Promise<FavoritesCategories[]> {
    return await prisma.favoritesCategories.findMany({
        where: {
            User: {
                id: id
            }
        },
    });
}

export async function getAllFavoriteCategories(): Promise<FavoritesCategories[]> {
    return await prisma.favoritesCategories.findMany({
        where: {},
    });
}

export async function deleteCategory(category: string, id: number): Promise<FavoritesCategories[] | FavoritesCategories> {
    const favCategory = await prisma.favoritesCategories.findMany({
        where: {
            name: category,
            User: {
                id: id
            }
        },
    });

    // if fav_category is > 0 ; it means this category was liked

    if (favCategory.length > 0) {
        return await prisma.favoritesCategories.delete({
            where: {
                id: favCategory[0].id
            }
        });
    } else {
        return favCategory;
    }
}

