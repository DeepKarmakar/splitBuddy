import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Card from './Components/Card';
import { DATA } from '../../assets/data';
import AddTrip from './Components/AddTrip';
import Popover from '../../Components/Popover';

const Dashboard = () => {
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={DATA}
				renderItem={({ item }) => <Card data={item} />}
				keyExtractor={item => item.id}
			/>
			<Popover
				title="Add your Trip details"
				content={<AddTrip />} />
		</SafeAreaView>
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