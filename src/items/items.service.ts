// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { Post, User } from "@prisma/client";
import { Context } from "../context";

export declare type UserWithPosts = User & {
	posts: Post[];
};

/**
 * Service Methods
 */
export class ItemsService {
	constructor(private _context: Context) {}

	public async findAll(): Promise<UserWithPosts[]> {
		return await this._context.prisma.user.findMany({
			include: {
				posts: true,
			},
		});
	}

	public async find(id: number): Promise<UserWithPosts | null> {
		return await this._context.prisma.user.findFirst({
			where: {
				id: id,
			},
			include: {
				posts: true,
			},
		});
	}

	public async create(newUser: User): Promise<User> {
		return await this._context.prisma.user.create({
			data: {
				name: newUser.name,
				email: newUser.email,
			},
		});
	}

	public async update(id: number, userUpdate: User): Promise<User> {
		return await this._context.prisma.user.update({
			where: {
				id: id,
			},
			data: {
				name: userUpdate.name,
				email: userUpdate.email,
			},
		});
	}

	public async remove(id: number): Promise<User> {
		return await this._context.prisma.user.delete({
			where: {
				id: id,
			},
		});
	}
}

// export const findAll = async (): Promise<UserWithPosts[]> => {
// 	const users = await context.prisma.user.findMany({
// 		include: {
// 			posts: true,
// 		},
// 	});

// 	return users;
// };

// export const find = async (id: number): Promise<Item> => items[id];

// export const create = async (newItem: BaseItem): Promise<Item> => {
// 	const id = new Date().valueOf();

// 	items[id] = {
// 		id,
// 		...newItem,
// 	};

// 	return items[id];
// };

// export const update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {
// 	const item = await find(id);

// 	if (!item) {
// 		return null;
// 	}

// 	items[id] = { id, ...itemUpdate };

// 	return items[id];
// };

// export const remove = async (id: number): Promise<null | void> => {
// 	const item = await find(id);

// 	if (!item) {
// 		return null;
// 	}

// 	delete items[id];
// };
