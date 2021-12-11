<script context="module">
	import { db } from '$lib/firebase/config';
	import { collection, getDocs } from 'firebase/firestore';

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
				console.log(transactions);
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

<script>
	import { addDoc } from 'firebase/firestore';
	export let transactions;

	// interface Transaction {
	// 	transactionType: string;
	// 	nftId: string;
	// 	collection: string;
	// 	coin: string;
	// 	amount: number;
	// 	quantity: number;
	// 	coinPrice: number;
	// 	total: number;
	// 	rank?: string;
	// 	notes?: string;
	// }

	const collectionRef = collection(db, 'transactions');

	async function addTransaction(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (const [k, v] of formData.entries()) {
			data[k] = v;
		}

		data['total'] = data.amount * data.quantity * data.coinPrice;
		console.log(data);

		try {
			await addDoc(collectionRef, {
				transactionType: data.transactionType,
				nftId: data.nftId,
				nftCollection: data.nftCollection,
				nftImageUrl: data.nftImageUrl,
				transactionCoin: data.coin,
				coinPrice: data.coinPrice,
				quantity: data.quantity,
				amount: data.amount,
				total: data.total,
				nftRank: data.rank,
				notes: data.notes
			});

			// Reset form
			e.target.reset();
		} catch (err) {
			console.log(err);
		}
	}

	async function deleteTransaction() {}

	// $: newTransactionData = {} as Transaction;

	// $: newTransactionData = {
	// 	transactionType: '',
	// 	nftId: '',
	// 	collection: '',
	// 	coin: '',
	// 	amount: 0,
	// 	quantity: 1,
	// 	coinPrice: 0,
	// 	total: () => {
	// 		return newTransactionData.amount * newTransactionData.quantity * newTransactionData.coinPrice;
	// 	},
	// 	rank: '',
	// 	notes: ''
	// };

	// $: transactionTotal =
	// 	newTransactionData.amount * newTransactionData.quantity * newTransactionData.coinPrice;
	// $: console.log(newTransactionData);
</script>

<head>
	<title>NFTYGMI</title>
</head>

<main>
	<section class="forms">
		<form on:submit|preventDefault={addTransaction} class="add-transaction">
			<label for="transactionType">Tx type:</label>
			<input type="text" name="transactionType" />

			<label for="nftId">NFT ID:</label>
			<input type="text" name="nftId" />

			<label for="nftCollection">Collection:</label>
			<input type="text" name="nftCollection" />

			<label for="nftImageUrl">NFT URL:</label>
			<input type="text" name="nftImageUrl" />

			<label for="coin">Coin:</label>
			<input type="text" name="coin" />

			<label for="coinPrice">Coin Price:</label>
			<input type="number" name="coinPrice" />

			<label for="quantity">Quantity:</label>
			<input type="number" name="quantity" />

			<label for="amount">Amount:</label>
			<input type="number" name="amount" />

			<label for="total">Total:</label>
			<input type="number" name="total" disabled />

			<label for="rank">Rank:</label>
			<input type="text" name="rank" />

			<label for="notes">Notes:</label>
			<input type="text" name="notes" />

			<button type="submit">Submit</button>
		</form>
	</section>

	<section class="transactions">
		<h1>NFTYGMI</h1>
		<h3>Transactions:</h3>
		{#each transactions as { id, transactionType, transactionCoin, nftId, nftCollection } (id)}
			<h3>{id}</h3>
			<ul>
				<li>{transactionType}</li>
				<li>{transactionCoin}</li>
				<li>{nftId}</li>
				<li>{nftCollection}</li>
			</ul>
		{/each}
	</section>
</main>

<style>
	.add-transaction {
		display: flex;
		flex-direction: column;
		max-width: 200px;
	}
</style>
