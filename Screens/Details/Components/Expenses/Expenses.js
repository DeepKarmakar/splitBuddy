import { Alert, FlatList, ScrollView, Text, View } from "react-native"
import ExpenseItem from "./ExpenseItem";
import Appstyles from '../../../../app.scss';
import { useContext, useEffect, useState } from "react";
import { randomId } from "../../../../Utils";
import Popover from "../../../../Components/Popover";
import AddExpense from "./AddExpense";
import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseDB } from "../../../../firebaseConfig";
import { StyleSheet } from "react-native-web";
import { EventContext } from "../../../../EventProvider/EventProvider";

const Expenses = ({ data, changeListener }) => {
	const [expenses, setExpenses] = useState([]);
	const [members, setMembers] = useState([]);
	const [expenseShortDetails, setExpenseShortDetails] = useState({});
	const eventStore = useContext(EventContext);
	const expenseObj = {
		id: randomId(),
		name: '',
		date: new Date(),
		amount: '',
		paidBy: ''
	}

	const removeHandler = async (id) => {
		Alert.alert('Do you want to delete?', '', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{ text: 'Yes', onPress: () => deleteExpenseDoc() },
		]);

		const deleteExpenseDoc = async () => {
			try {
				await deleteDoc(doc(FirebaseDB, "trips", data.id, "expenseList", id)).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				});
			} catch (error) {
				console.log(error);
			}
		};
	};

	const watchExpense = async () => {
		// await eventStore.watchExpenses(data.id);
		// setExpenses(eventStore.eventDetails.expenses)
	};
	const watchMembers = async () => {
		await eventStore.watchMembers(data.id);
		setMembers(eventStore.eventDetails.expenses)
	};

	useEffect(() => {
		if (eventStore?.eventDetails?.expenses?.length) {
			setExpenses(eventStore.eventDetails.expenses)
		}
		if (eventStore?.eventDetails?.members?.length) {
			setMembers(eventStore.eventDetails.members)
		}
		console.log('eventStore.eventDetails');
	}, [eventStore]);

	useEffect(() => {
		if (expenses?.length) {
			const subtotal = expenses.map(item => item.amount).reduce((prev, next) => prev + next);
			const perHead = subtotal / (members.length);
			setExpenseShortDetails({ subtotal, perHead })
		}
	}, [expenses, members]);

	return (
		<View style={styles.container}>
			<ScrollView style={Appstyles.ExpenseContainer}>
				<FlatList
					data={expenses}
					renderItem={({ item }) => <ExpenseItem data={item} removeExpense={(id) => removeHandler(id)} />}
					keyExtractor={item => item.id}
				/>
				{expenses?.length != 0 ? (
					<>
						<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
							<Text>Subtotal:</Text>
							<Text>{expenseShortDetails.subtotal}</Text>
						</View>
						<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
							<Text>Per Head:</Text>
							<Text>{expenseShortDetails.perHead}</Text>
						</View>
					</>
				) : (
					<Text style={Appstyles.p_15}>Add your Expenses</Text>
				)}
			</ScrollView>
			<Popover
				title="Add Expense"
				content={<AddExpense documentId={data.id} members={members} watchExpense={watchExpense} />} />
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 20,
	},
})

export default Expenses;