import { writable } from 'svelte/store';
import { db } from '$lib/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

export const transactions = writable([]);
const collectionRef = collection(db, 'transactions');

// NOTE If I use a function and then call it at the bottom
// of this file, it doesn't auto-update since onSnapshot
// is inside the function. Therefore, I need to just use
// onSnapshot() directly and then .set() the Store
// Using onSnapshot instead of getDocs
onSnapshot(collectionRef, (snapshot) => {
	let transactionsDocs = [];
	snapshot.docs.forEach((doc) => {
		transactionsDocs.push({
			...doc.data(),
			id: doc.id
		});
	});
	console.log('Store:onSnapshot():transactions', transactionsDocs);
	transactions.set(transactionsDocs);
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
