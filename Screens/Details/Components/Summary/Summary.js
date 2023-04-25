import { FlatList, SafeAreaView, Text, View } from "react-native"
import SummaryCard from "./SummaryCard";
import SplitSummary from "./SplitSummary";
import Appstyles from '../../../../app.scss';
import { EventContext } from "../../../../EventProvider/EventProvider";
import { useContext, useEffect, useState } from "react";

const Summary = ({ data }) => {
	const eventStore = useContext(EventContext);
	const [expenseList, setExpenseList] = useState([])
	const [expenseShortDetails, setExpenseShortDetails] = useState({});
	useEffect(() => {
		console.log('summary', eventStore.eventDetails);
		const summaryObj = {};
		const expenses = eventStore.eventDetails.expenses;
		const members = JSON.parse(JSON.stringify(eventStore.eventDetails.members)).map(member => ({ ...member, amountSpent: 0 }));

		if (expenses?.length && members?.length) {
			// calculate short details(subtotal & per head)
			const subtotal = expenses.map(item => item.amount).reduce((prev, next) => prev + next);
			const perHead = subtotal / (members.length);
			setExpenseShortDetails({ subtotal, perHead })

			// calculate expense member wise (amount spaent by each member)
			expenses.map(expense => {
				members.find(member => {
					if (expense.paidBy.id === member.id) {
						member.amountSpent += expense.amount;
						member.share = member.amountSpent - perHead;
					}
				})
				if (summaryObj[expense.paidBy.name]) {
					summaryObj[expense.paidBy.name] += expense.amount;
				} else {
					summaryObj[expense.paidBy.name] = expense.amount;
				}
			})
			members.sort((a, b) => b.amount - a.amount)
			setExpenseList(members)

			// get members who paid extra

			console.log('member details', members);

		}



	}, [eventStore]);
	return (
		<SafeAreaView>
			<FlatList
				data={expenseList}
				renderItem={({ item }) => <SummaryCard data={item} />}
				keyExtractor={item => item.id}
			/>
			<View style={Appstyles.divider} />
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Subtotal:</Text>
				<Text>{expenseShortDetails.subtotal}</Text>
			</View>
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Per Head:</Text>
				<Text>{expenseShortDetails.perHead}</Text>
			</View>
			<View style={Appstyles.divider} />
			<Text style={[Appstyles.p_15, Appstyles.text_bold]}>How to settle?</Text>
			<FlatList
				data={data.splitSummary}
				renderItem={({ item }) => <SplitSummary data={item} />}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}

export default Summary;