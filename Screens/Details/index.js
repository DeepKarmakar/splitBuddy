import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
// import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Popover from '../../Components/Popover';
import { EventContext } from '../../EventProvider/EventProvider';
import { FirebaseDB } from '../../firebaseConfig';
import Expenses from './Components/Expenses/Expenses';
import Members from './Components/Members/Members';
import Summary from './Components/Summary/Summary';
import { GetDate } from "../../Utils";

const renderScene = ({ route, jumpTo }) => {
	switch (route.key) {
		case 'expenses':
			return <Expenses data={route.data} />;
		case 'members':
			return <Members data={route.data} isUpdate={true} />;
		case 'summary':
			return <Summary data={route.data} />;
	}
};

const Details = ({ route, navigation }) => {
	const [eventDetails, setEventDetails] = useState({});
	const [members, setMembers] = useState([]);
	const eventStore = useContext(EventContext);

	const data = route.params;
	const layout = useWindowDimensions();
	const [index, setIndex] = useState(0);
	const [routes, setRoutes] = useState([]);

	useEffect(() => {

		const fetchExpense = async () => {
			const expenseCollection = query(collection(FirebaseDB, "trips", data.id, "expenseList"), orderBy('date', "desc"))
			await onSnapshot(expenseCollection, async (querySnapshot) => {
				if (querySnapshot.size > 0) {
					let index = 1;
					const expensesCopy = [];
					await querySnapshot.forEach(async (snapshotDoc) => {
						const obj = { ...snapshotDoc.data() }
						obj.date = GetDate(obj.date)
						expensesCopy.push(obj)
						const membeDocRef = doc(FirebaseDB, "trips", data.id, "members", obj.paidBy.id)
						try {
							await getDoc(membeDocRef).then(async memberSnapshot => {
								if (memberSnapshot?.id) {
									obj.paidBy = await memberSnapshot.data();
									if (obj.paidBy) {

										obj.paidBy.id = memberSnapshot.id;
										obj.id = snapshotDoc.id;
										// expensesCopy.push(obj);
										if (index == querySnapshot.size) {
											const copyData = eventDetails;
											copyData.expenses = expensesCopy;
											setEventDetails(copyData)
											const newEeventDetails = eventStore.eventDetails;
											newEeventDetails.expenses = expensesCopy;
											eventStore.setEventDetails(newEeventDetails)
										}
									}
								}
								index++;
							});
						} catch (error) {
							console.log(error)
						}
					});
				} else {
					const newEeventDetails = eventStore.eventDetails;
					newEeventDetails.expenses = [];
					eventStore.setEventDetails(newEeventDetails)
				}
			});
		}
		fetchExpense();

		const fetchMembers = async () => {
			const membersCollection = collection(FirebaseDB, "trips", data.id, "members")
			await onSnapshot(membersCollection, async (querySnapshot) => {
				const membersCopy = [];
				if (querySnapshot.size > 0) {
					await querySnapshot.forEach((snapshotDoc) => {
						const obj = { ...snapshotDoc.data() }
						obj.id = snapshotDoc.id;
						obj.isDbData = true;
						membersCopy.push(obj);
					});
					setMembers(membersCopy)
					const dataSet = data;
					dataSet.members = membersCopy;
					const newEeventDetails = eventStore.eventDetails;
					newEeventDetails.members = membersCopy;
					eventStore.setEventDetails(newEeventDetails)
					setRoutes([
						{ key: 'expenses', title: 'Expenses', data },
						{ key: 'members', title: 'Members', data: dataSet },
						{ key: 'summary', title: 'Summary', data: getSummaryData() },
					])
				}
			});
		}

		fetchMembers();

	}, [])


	return (
		<>
			{members.length > 0 && (
				<TabView style={{ flex: 1, backgroundColor: '#fff' }}
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: layout.width }}
				/>
			)}
		</>
	);
}

const getSummaryData = (expenses) => {
	const summary = {
		expenseList: [
			{
				id: 1,
				name: 'Deep',
				amount: 1000
			},
			{
				id: 2,
				name: 'Piu',
				amount: 2000
			},
			{
				id: 3,
				name: 'Kunal',
				amount: 0
			},
			{
				id: 4,
				name: 'Joyeta',
				amount: 0
			}
		],
		splitSummary: [
			{
				id: 1,
				payTo: 'Deep',
				payBy: 'Kunal',
				amount: 1000
			},
			{
				id: 2,
				payTo: 'Piu',
				payBy: 'Joyeta',
				amount: 1000
			},
		]
	}

	return summary;
}

export default Details;