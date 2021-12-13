<script context="module">
	import { db } from '$lib/firebase/config';
	import { collection, getDocs } from 'firebase/firestore';
	// Q: Use onSnapshot inside module or regular script?

	export async function load() {
		const collectionRef = collection(db, 'transactions');
		let transactions = [];

		// Using onSnapshot instead of getDocs
		// onSnapshot(collectionRef, (snapshot) => {
		// 	snapshot.docs.forEach((doc) => {
		// 		transactions.push({
		// 			...doc.data(),
		// 			id: doc.id
		// 		});
		// 	});
		// 	console.log('onSnapshot():transactions', transactions);
		// });

		await getDocs(collectionRef)
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					transactions.push({
						...doc.data(),
						id: doc.id
					});
				});
				console.log('load():transactions:', transactions);
			})
			.catch((error) => {
				console.log(error.message);
				return {
					error
				};
			});

		return { props: { transactions } };
	}
</script>

<script context="module">
	import { db } from '$lib/firebase/config';
	import { collection, getDocs } from 'firebase/firestore';
	// Q: Use onSnapshot inside module or regular script?

	export async function load() {
		const collectionRef = collection(db, 'transactions');
		let transactions = [];

		await getDocs(collectionRef)
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					transactions.push({
						...doc.data(),
						id: doc.id
					});
				});
				console.log('load():transactions:', transactions);
			})
			.catch((error) => {
				console.log(error.message);
				return {
					error
				};
			});

		return { props: { transactions } };
	}
</script>

