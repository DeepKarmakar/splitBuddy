import { FlatList, Pressable, ScrollView, Text, View } from "react-native"
import ExpenseItem from "./ExpenseItem";
import Appstyles from '../../../../app.scss';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { randomId } from "../../../../Utils";

const Expenses = ({ data }) => {

	const [expenses, setExpenses] = useState(data.expenseList || []);
	const [expenseShortDetails, setExpenseShortDetails] = useState({});

	const changeHandler = (val, name, index) => {
		const copyExpenses = [...expenses];
		copyExpenses[index][name] = val;
		setExpenses(copyExpenses);
	}
	const removeHandler = (index) => {
		const copyExpenses = [...expenses];
		copyExpenses.splice(index, 1);
		setExpenses(copyExpenses);
	};
	const addExpense = () => {
		const expenseObj = {
			id: randomId(),
			name: '',
			date: new Date(),
			amount: 0,
			paidBy: ''
		}
		setExpenses([...expenses, expenseObj])
	};

	useEffect(() => {
		if (expenses.length) {
			const subtotal = expenses.map(item => item.amount).reduce((prev, next) => prev + next);
			const perHead = subtotal / (data.members.length);
			setExpenseShortDetails({ subtotal, perHead })
		}
	}, [expenses]);

	return (
		<ScrollView style={Appstyles.ExpenseContainer}>
			<FlatList
				data={expenses}
				renderItem={({ item, index }) => <ExpenseItem data={item} handleValueChange={(val, name) => changeHandler(val, name, index)} removeExpense={() => removeHandler(index)} />}
				keyExtractor={item => item.id}
			/>
			<Pressable
				style={[Appstyles.flex_direction_row, Appstyles.p_15, Appstyles.align_items_center]}
				onPress={addExpense}>
				<Icon
					name="plus"
					size={20}
					color="#000"
				/>
				<Text style={Appstyles.ml_10}>Expense</Text>
			</Pressable>
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Subtotal:</Text>
				<Text>{expenseShortDetails.subtotal}</Text>
			</View>
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Per Head:</Text>
				<Text>{expenseShortDetails.perHead}</Text>
			</View>
		</ScrollView>
	)
}

export default Expenses;