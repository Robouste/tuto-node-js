/**
 * Required External Modules and Interfaces
 */

import { User } from "@prisma/client";
import express, { Request, Response, Router } from "express";
import { context } from "../context";
import { ItemsService, UserWithPosts } from "./items.service";

export class UsersRouter {
	private static _router: Router;
	public static get router(): Router {
		if (this._router == null) {
			this.init();
		}

		return this._router;
	}

	private static init(): void {
		const service = new ItemsService(context);
		this._router = express.Router();

		// GET users
		this.router.get("/", async (req: Request, res: Response) => {
			try {
				const users: UserWithPosts[] = await service.findAll();

				res.status(200).send(users);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// GET users/:id
		this.router.get("/:id", async (req: Request, res: Response) => {
			const id: number = parseInt(req.params.id, 10);

			try {
				const user: UserWithPosts | null = await service.find(id);

				if (user) {
					return res.status(200).send(user);
				}

				res.status(404).send("item not found");
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// POST users
		this.router.post("/", async (req: Request, res: Response) => {
			try {
				const item: User = req.body;

				const newItem = await service.create(item);

				res.status(201).json(newItem);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// PUT users/:id
		this.router.put("/:id", async (req: Request, res: Response) => {
			const id: number = parseInt(req.params.id, 10);

			try {
				const userUpdate: User = req.body;

				const existingItem: User | null = await service.find(id);

				if (existingItem) {
					const updatedUser = await service.update(id, userUpdate);
					return res.status(200).json(updatedUser);
				}

				const newUser = await service.create(userUpdate);

				res.status(201).json(newUser);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});

		// DELETE users/:id
		this.router.delete("/:id", async (req: Request, res: Response) => {
			try {
				const id: number = parseInt(req.params.id, 10);
				await service.remove(id);

				res.sendStatus(204);
			} catch (e: any) {
				res.status(500).send(e.message);
			}
		});
	}
}
// /**
//  * Controller Definitions
//  */
// export const itemsRouter = express.Router();

// // GET items

// itemsRouter.get("/", async (req: Request, res: Response) => {
// 	try {
// 		const items: Item[] = await ItemService.findAll();

// 		res.status(200).send(items);
// 	} catch (e: any) {
// 		res.status(500).send(e.message);
// 	}
// });

// // GET items/:id

// itemsRouter.get("/:id", async (req: Request, res: Response) => {
// 	const id: number = parseInt(req.params.id, 10);

// 	try {
// 		const item: Item = await ItemService.find(id);

// 		if (item) {
// 			return res.status(200).send(item);
// 		}

// 		res.status(404).send("item not found");
// 	} catch (e: any) {
// 		res.status(500).send(e.message);
// 	}
// });

// // POST items

// itemsRouter.post("/", async (req: Request, res: Response) => {
// 	try {
// 		const item: BaseItem = req.body;

// 		const newItem = await ItemService.create(item);

// 		res.status(201).json(newItem);
// 	} catch (e: any) {
// 		res.status(500).send(e.message);
// 	}
// });

// // PUT items/:id

// itemsRouter.put("/:id", async (req: Request, res: Response) => {
// 	const id: number = parseInt(req.params.id, 10);

// 	try {
// 		const itemUpdate: Item = req.body;

// 		const existingItem: Item = await ItemService.find(id);

// 		if (existingItem) {
// 			const updatedItem = await ItemService.update(id, itemUpdate);
// 			return res.status(200).json(updatedItem);
// 		}

// 		const newItem = await ItemService.create(itemUpdate);

// 		res.status(201).json(newItem);
// 	} catch (e: any) {
// 		res.status(500).send(e.message);
// 	}
// });

// // DELETE items/:id

// itemsRouter.delete("/:id", async (req: Request, res: Response) => {
// 	try {
// 		const id: number = parseInt(req.params.id, 10);
// 		await ItemService.remove(id);

// 		res.sendStatus(204);
// 	} catch (e: any) {
// 		res.status(500).send(e.message);
// 	}
// });
