// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker';

let createItem = () => {
	let items = [];
	let quantity = faker.commerce.price(1, 25);

	for (let i = 0; i < quantity; i++) {
		items.push({
			name: faker.commerce.product(),
			price: faker.commerce.price(1, 80, 0),
			netto: faker.commerce.price(1, 30, 0),
			quantity: faker.commerce.price(1, 10, 0),
		});
	}
	let price = 0;
	let brutto = 0;

	items.forEach((el) => {
		price += +el.price;
		brutto += +el.netto;
	});
	return { items: items, price: price, brutto };
};

export default function handler(req, res) {
	let declarations = [];
	function createRandomUser(i) {
		// console.log(wow)
		let data = createItem();
		return {
			id: `${i}`,
			declarationId: faker.random.alpha({ count: 2, casing: 'upper' }) + faker.random.numeric(6),
			userId: faker.datatype.uuid(),
			username: faker.name.fullName(),
			passport: faker.random.alpha({ count: 2, casing: 'upper' }) + faker.random.numeric(7),
			quantity: `${data.items.length}`,
			brutto: data.brutto,
			sum: data.price,
			items: data.items,
			selected: false,
		};
	}
	Array.from({ length: 58 }).forEach((el, i) => {
		declarations.push(createRandomUser(i));
	});

	res.status(200).json(declarations);
}
