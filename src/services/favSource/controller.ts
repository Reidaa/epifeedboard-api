import {PrismaClient, FavoritesSources} from "@prisma/client";

const prisma = new PrismaClient();

export async function findOrCreate(source: string, id: number): Promise<FavoritesSources[] | FavoritesSources> {
    const favSource = await prisma.favoritesSources.findMany({
        where: {
            name: source,
            User: {
                id: id
            }
        },
    });

    // if fav_source is < 0 ; it means this source is not already liked

    if (favSource.length <= 0) {
        return await prisma.favoritesSources.create({
            data: {
                name: source,
                User: {
                    connect: {id: id}
                }
            }
        });
    } else {
        return favSource;
    }
}

export async function getUserFavoriteSources(id: number): Promise<FavoritesSources[]> {
    return await prisma.favoritesSources.findMany({
        where: {
            User: {
                id: id
            }
        },
    });
}

export async function getAllFavoriteSources(): Promise<FavoritesSources[]> {
    return await prisma.favoritesSources.findMany({
        where: {},
    });
}

export async function deleteSource(source: string, id: number): Promise<FavoritesSources | FavoritesSources[]> {
    const favSource = await prisma.favoritesSources.findMany({
        where: {
            name: source,
            User: {
                id: id
            }
        },
    });

    // if fav_source is > 0 ; it means this source was liked

    if (favSource.length > 0) {
        return await prisma.favoritesSources.delete({
            where: {
                id: favSource[0].id
            }
        });
    } else {
        return favSource;
    }
}

