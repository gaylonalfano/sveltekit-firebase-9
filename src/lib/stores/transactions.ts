import { writable } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const TransactionsStore = writable([] as Transaction[]);
const collectionRef = collection(db, 'transactions');

interface Transaction {
	id: string;
	transactionType: string;
	nftId: string;
	nftCollection: string;
	nftImageUrl?: string;
	transactionCoin: string;
	amount: number;
	quantity: number;
	coinPrice: number;
	total: number;
	nftRank?: string;
	notes?: string;
}
// NOTE If I use a function and then call it at the bottom
// of this file, it doesn't auto-update since onSnapshot
// is inside the function. Therefore, I need to just use
// onSnapshot() directly and then .set() the Store
// Using onSnapshot instead of getDocs
onSnapshot(collectionRef, (snapshot) => {
	const transactions = [];
	snapshot.docs.forEach((doc) => {
		transactions.push({
			...doc.data(),
			id: doc.id
		});
	});
	console.log('Store:onSnapshot():transactions', transactions);
	TransactionsStore.set(transactions);
});

// NOTE This doesn't work when using onSnapshot(). See above
// function getTransactions() {
// 	const collectionRef = collection(db, 'transactions');
// 	let transactionsDocs = [];

// 	// Using onSnapshot instead of getDocs
// 	onSnapshot(collectionRef, (snapshot) => {
// 		snapshot.docs.forEach((doc) => {
// 			transactionsDocs.push({
// 				...doc.data(),
// 				id: doc.id
// 			});
// 		});
// 		console.log('Store:onSnapshot():transactions', transactions);
// 		transactions.set(transactionsDocs);
// 	});

// 	// await getDocs(collectionRef).then((snapshot) => {
// 	// 	snapshot.docs.forEach((doc) => {
// 	// 		transactionsDocs.push({
// 	// 			...doc.data(),
// 	// 			id: doc.id
// 	// 		});
// 	// 	});
// 	// 	console.log('Store:transactions:', transactionsDocs);
// 	// });

// 	// transactions.set(transactionsDocs);
// }

// getTransactions();
