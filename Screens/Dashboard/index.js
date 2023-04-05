import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Text } from 'react-native';
import Card from './Components/Card';
import AddTrip from './Components/AddTrip';
import Popover from '../../Components/Popover';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FirebaseDB } from '../../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Appstyles from '../../app.scss';


const Dashboard = () => {
	const auth = getAuth();
	const currentUserId = auth.currentUser.uid;
	const [data, setData] = useState([]);
	const [showLoader, setShowLoader] = useState(true);
	const dbQuery = query(collection(FirebaseDB, "trips"), where("uid", "==", currentUserId));
	useEffect(() => {
		const getUserTrips = async () => {
			await onSnapshot(dbQuery, (querySnapshot) => {
				const trips = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					const obj = { ...doc.data() }
					obj.id = doc.id;
					trips.push(obj)
				});
				setData(trips);
				setShowLoader(false)
			});
		}
		getUserTrips()
	}, [])

	return (
		<>
			{showLoader ? (
				<ActivityIndicator
					color="#0164FE"
					style={Appstyles.loader_container}
					animating={showLoader} />

			) : (
				<SafeAreaView style={styles.container}>
					{data.length == 0 ? (
						<Text style={Appstyles.p_30}>No Trip found, Please add</Text>
					) : (
						<FlatList
							data={data}
							renderItem={({ item }) => <Card data={item} />}
							keyExtractor={item => item.id}
						/>
					)}
					<Popover
						title="Add your Trip details"
						content={<AddTrip />} />
				</SafeAreaView>
			)}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
		paddingBottom: 20,
	},
})

export default Dashboard;