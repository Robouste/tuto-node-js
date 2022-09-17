import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Bob",
	// 		email: "bob@gmail.com",
	// 		posts: {
	// 			create: {
	// 				title: "I'm awesome",
	// 				content: "<im src='https://attachments.f95zone.to/2020/08/799319_day7_ev04-15.jpg' />",
	// 			},
	// 		},
	// 	},
	// });

	// console.log(user);
	const users = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});
	console.dir(users, { depth: null });
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
