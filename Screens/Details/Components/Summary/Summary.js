import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import SummaryCard from "./SummaryCard";
import SplitSummary from "./SplitSummary";
import Appstyles from '../../../../app.scss';
import { EventContext } from "../../../../EventProvider/EventProvider";
import { useContext, useEffect, useState } from "react";
import { roundOf } from "../../../../Utils";

const Summary = ({ data }) => {
	const eventStore = useContext(EventContext);
	const [expenseList, setExpenseList] = useState([])
	const [expenseShortDetails, setExpenseShortDetails] = useState({});
	const [splitSummary, setSplitSummary] = useState([]);
	useEffect(() => {
		const summaryObj = {};
		const payByMembers = [];
		const payToMembers = [];
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
					} else {
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
			const membersCopy = JSON.parse(JSON.stringify(members))
			setExpenseList(membersCopy)
			// get members who paid extra
			members.map(member => {
				if (member.amountSpent > perHead) {
					payToMembers.push(member.name)
				}
				else if (member.amountSpent < perHead) {
					payByMembers.push(member.name)
				}
			})
			// console.log(payToMembers);
			// console.log(payByMembers);
			const splitArr = [];
			let splitIndex = 0;
			payToMembers.map(payTo => {
				payByMembers.map(payBy => {

					const payByMemberDetails = members.find(member => member.name == payBy)
					const payToMemberDetails = members.find(member => member.name == payTo)

					if (payByMemberDetails.share < 0) {
						if (payToMemberDetails.share > Math.abs(payByMemberDetails.share)) {

							if (payByMemberDetails.share != 0) {
								const obj = {
									id: splitIndex,
									payTo: payTo,
									payBy: payBy,
									amount: Math.abs(payByMemberDetails.share)
								}
								splitArr.push(obj)
							}

							payToMemberDetails.share = payToMemberDetails.share + payByMemberDetails.share;
							payByMemberDetails.share = 0;

						} else {
							if (payToMemberDetails.share != 0) {
								const obj = {
									id: splitIndex,
									payTo: payTo,
									payBy: payBy,
									amount: payToMemberDetails.share
								}
								splitArr.push(obj)
							}

							payByMemberDetails.share = payToMemberDetails.share + payByMemberDetails.share;
							payToMemberDetails.share = 0;

						}

					}
					splitIndex++;
				})
			})
			setSplitSummary(splitArr)
		}



	}, [eventStore.eventDetails.members, eventStore.eventDetails.expenses]);
	return (
		<ScrollView>
			<FlatList
				data={expenseList}
				renderItem={({ item }) => <SummaryCard data={item} />}
				keyExtractor={item => item.id}
			/>
			<View style={styles.dotted_border} />
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Subtotal:</Text>
				<Text>{expenseShortDetails.subtotal}</Text>
			</View>
			<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.p_15]}>
				<Text>Per Head:</Text>
				<Text>{roundOf(expenseShortDetails.perHead)}</Text>
			</View>
			<View style={styles.dotted_border} />
			<Text style={[Appstyles.p_15, Appstyles.text_bold]}>How to settle?</Text>
			<FlatList
				data={splitSummary}
				renderItem={({ item }) => <SplitSummary data={item} />}
				keyExtractor={item => item.id}
			/>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	dotted_border: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
		borderStyle: "dashed"
	},
})


export default Summary;