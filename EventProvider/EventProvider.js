import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { FirebaseDB } from '../firebaseConfig';

export const EventContext = createContext(null);

const EventProvider = (props) => {
	const [eventDetails, setEventDetails] = useState({});

	const watchExpenses = async (eventId) => {
		const expenseCollection = query(collection(FirebaseDB, "trips", eventId, "expenseList"), orderBy('date', "desc"))
		await onSnapshot(expenseCollection, (querySnapshot) => {
			const expensesCopy = [];
			querySnapshot.forEach((snapshotDoc) => {
				const obj = { ...snapshotDoc.data() }
				obj.id = snapshotDoc.id;
				expensesCopy.push(obj)
			});
			const copyData = eventDetails;
			copyData.expenses = expensesCopy;
			setEventDetails(copyData)
		});
		console.log('watch');
	}

	const watchMembers = async (eventId) => {
		const membersCollection = collection(FirebaseDB, "trips", eventId, "members")
		await onSnapshot(membersCollection, async (querySnapshot) => {
			const membersCopy = [];
			await querySnapshot.forEach((snapshotDoc) => {
				const obj = { ...snapshotDoc.data() }
				obj.id = snapshotDoc.id;
				membersCopy.push(obj);
			});
			const copyData = eventDetails;
			copyData.members = membersCopy;
			copyData.tripDetailsLoading = false;
			setEventDetails(copyData)
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