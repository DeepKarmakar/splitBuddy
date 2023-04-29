import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Appstyles from '../../../app.scss';
import { DummyTrip } from '../../../assets/images';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from "react";
import { EventContext } from "../../../EventProvider/EventProvider";



const Card = ({ data }) => {
	const navigation = useNavigation();
	const eventStore = useContext(EventContext);

	const { title, date, coverImage, id } = data;
	let serverDate, getDate;
	if (date?.seconds) {
		serverDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
		getDate = moment(serverDate).format('DD/MM/YYYY');
	}
	const navigateToDetails = async (e) => {

		navigation.navigate('Details', data)


		return

		const copyData = data;
		copyData.expenses = [];
		copyData.members = [];
		copyData.tripDetailsLoading = true;
		await eventStore.setEventDetails(copyData);
		const expensePromise = await new Promise(async (resolve, reject) => {
			await eventStore.watchExpenses(data.id);
			resolve()
		})
		const membersPromise = await new Promise(async (resolve, reject) => {
			await eventStore.watchMembers(data.id);
			resolve()
		})

		const allPromise = Promise.all([expensePromise, membersPromise]);
		allPromise.then(() => {
			// console.log('all done');
		}).catch(error => {
			console.log(error);
		})
	};
	useEffect(() => {
		if (eventStore.eventDetails.hasOwnProperty('tripDetailsLoading') && !eventStore.eventDetails.tripDetailsLoading) {
			// console.log("done");
			navigation.navigate('Details', data)
		}

	}, [eventStore.eventDetails])


	return (
		<TouchableOpacity
			style={styles.cardContainer}
			onPress={(e) => navigateToDetails(e)}>
			<View style={[Appstyles.flex_direction_row]}>
				{coverImage ? (
					<Image source={{ uri: coverImage }} style={[styles.cardImage]} />
				) : (
					<Image source={DummyTrip} style={[styles.cardImage]} />
				)}
				<View style={[Appstyles.justify_content_center, Appstyles.ml_10]}>
					<Text style={[Appstyles.h2]}>{title}</Text>
					<Text style={[Appstyles.date]}>{getDate || ''}</Text>
				</View>
			</View>

			<Icon
				name="right"
				size={20}
				color="#000"
				style={styles.bottomPosition}
			/>
		</TouchableOpacity>
	)
};

const styles = StyleSheet.create({
	cardContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		marginTop: 15,
		borderRadius: 4,
		shadowColor: 'rgba(0, 0, 0, 0.3)',
		shadowOffset: {
			width: 3,
			height: 3,
		},
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 2,
		backgroundColor: 'white',
	},
	cardImage: {
		width: 65,
		height: 65,
		borderRadius: 50
	}
})

export default Card;