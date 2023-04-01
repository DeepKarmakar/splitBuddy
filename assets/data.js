import { goa, mandarmani } from "./images";

export const DATA = [
	{
		id: 1,
		title: 'Mandarmani',
		coverImage: mandarmani,
		date: new Date("2023-03-10 22:57:36"),
		members: [
			{
				name: 'Piu',
				id: 1,
			},
			{
				name: 'Deep',
				id: 2,
			},
			{
				name: 'Kunal',
				id: 3,
			},
			{
				name: 'Joyeta',
				id: 4,
			},
			{
				name: 'Sumit',
				id: 5,
			},
		],
		expenseList: [
			{
				id: 1,
				name: 'Hotel',
				date: new Date("2023-03-11 10:34:23"),
				amount: 2000,
				paidBy: 'Deep'
			},
			{
				id: 2,
				name: 'Train',
				date: new Date("2023-03-11 10:34:23"),
				amount: 2200,
				paidBy: 'Piu'
			},
		]
	},
	{
		id: 2,
		title: 'Goa',
		coverImage: goa,
		date: new Date("2022-9-13 22:57:36"),
		members: [
			{
				name: 'Piu',
				id: 1,
			},
			{
				name: 'Deep',
				id: 2,
			},
			{
				name: 'Kunal',
				id: 3,
			},
			{
				name: 'Joyeta',
				id: 4,
			},
		],
		expenseList: [
			{
				id: 1,
				name: 'Hotel',
				date: new Date("2023-03-11 10:34:23"),
				amount: 2000,
				paidBy: 'Deep'
			},
			{
				id: 2,
				name: 'Train',
				date: new Date("2023-03-11 10:34:23"),
				amount: 2200,
				paidBy: 'Piu'
			},
		]
	},
];