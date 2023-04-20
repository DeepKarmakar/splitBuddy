import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';

export const EventContext = createContext(null);

const EventProvider = (props) => {
	const [eventDetails, setEventDetails] = useState({});

	const watchExpenses = async (eventId) => {
		const expenseCollection = query(collection(FirebaseDB, "trips", eventId, "expenseList"), orderBy('date', "desc"))

		const getSnapshot = async () => {
			await onSnapshot(expenseCollection, async (querySnapshot) => {
				let index = 1;
				if (querySnapshot.size > 0) {

					const expensesCopy = [];
					await querySnapshot.forEach(async (snapshotDoc) => {
						const obj = { ...snapshotDoc.data() }
						const membeDocRef = doc(FirebaseDB, "trips", eventId, "members", obj.paidBy.id)
						try {
							await getDoc(membeDocRef).then(memberSnapshot => {
								obj.paidBy = memberSnapshot.data();
								obj.paidBy.id = memberSnapshot.id;
								obj.id = snapshotDoc.id;
								expensesCopy.push(obj);
								if (index == querySnapshot.size) {
									const copyData = eventDetails;
									copyData.expenses = expensesCopy;
									setEventDetails(copyData)
									console.log(copyData);
								}
								index++;
							});
						} catch (error) {
							console.log(error)
						}
					});
				} else {
					const copyData = eventDetails;
					copyData.expenses = [];
					setEventDetails(copyData)
				}
			});

		}

		await getSnapshot();

	}

	const watchMembers = async (eventId) => {
		const membersCollection = collection(FirebaseDB, "trips", eventId, "members")
		await onSnapshot(membersCollection, async (querySnapshot) => {
			const membersCopy = [];
			if (querySnapshot.size > 0) {
				await querySnapshot.forEach((snapshotDoc) => {
					const obj = { ...snapshotDoc.data() }
					obj.id = snapshotDoc.id;
					membersCopy.push(obj);
				});
				const copyData = eventDetails;
				copyData.members = membersCopy;
				copyData.tripDetailsLoading = false;
				setEventDetails(copyData)
			} else {
				const copyData = eventDetails;
				copyData.members = [];
				copyData.tripDetailsLoading = false;
				setEventDetails(copyData)
			}
		});
	}
	return (
		<EventContext.Provider
			value={{
				eventDetails,
				setEventDetails,
				watchExpenses: watchExpenses,
				watchMembers: watchMembers
			}}>
			{props.children}
		</EventContext.Provider>
	)
}

export default EventProvider

const styles = StyleSheet.create({})