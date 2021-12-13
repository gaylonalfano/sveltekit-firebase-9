<script lang="ts">
	import { TransactionsStore } from '$lib/stores/transactions';
	import { db } from '$lib/firebase/config';
	import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
	// export let transactions: Record<string, any>[];
	//console.log('script:transactions:', transactions);
	console.log($TransactionsStore);

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

	async function addTransaction(e) {
		const formData = new FormData(e.target);

		const data = {} as Transaction;
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
				transactionCoin: data.transactionCoin,
				coinPrice: data.coinPrice,
				quantity: data.quantity,
				amount: data.amount,
				total: data.total,
				nftRank: data.nftRank,
				notes: data.notes
			});

			// Reset form
			e.target.reset();
		} catch (err) {
			console.log(err);
		}
	}

	async function deleteTransaction(e) {
		const docRef = doc(db, 'transactions', e.target.docId.value);
		// console.log(docRef); // Has the doc.id property

		try {
			await deleteDoc(docRef);
			e.target.reset();
		} catch (err) {
			console.log(err);
		}
	}

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
		<div class="add-transaction">
			<form on:submit|preventDefault={addTransaction}>
				<label for="transactionType">Tx type:</label>
				<input type="text" name="transactionType" />

				<label for="nftId">NFT ID:</label>
				<input type="text" name="nftId" />

				<label for="nftCollection">Collection:</label>
				<input type="text" name="nftCollection" />

				<label for="nftImageUrl">NFT URL:</label>
				<input type="text" name="nftImageUrl" />

				<label for="transactionCoin">Coin:</label>
				<input type="text" name="transactionCoin" />

				<label for="coinPrice">Coin Price:</label>
				<input type="number" name="coinPrice" />

				<label for="quantity">Quantity:</label>
				<input type="number" name="quantity" />

				<label for="amount">Amount:</label>
				<input type="number" name="amount" />

				<label for="total">Total:</label>
				<input type="number" name="total" disabled />

				<label for="nftRank">Rank:</label>
				<input type="text" name="nftRank" />

				<label for="notes">Notes:</label>
				<input type="text" name="notes" />

				<button type="submit">Submit</button>
			</form>
		</div>

		<div class="delete-transaction">
			<form on:submit|preventDefault={deleteTransaction}>
				<label for="docId">ID:</label>
				<input type="text" name="docId" />

				<button type="submit">Submit</button>
			</form>
		</div>
	</section>

	<section class="transactions">
		<h1>NFTYGMI</h1>
		<h3>Transactions:</h3>
		{#each $TransactionsStore as { id, transactionType, transactionCoin, nftId, nftCollection } (id)}
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
	.forms {
		display: flex;
		flex-direction: column;
	}
</style>
