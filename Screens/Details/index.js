import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Popover from '../../Components/Popover';
import Expenses from './Components/Expenses/Expenses';
import Members from './Components/Members/Members';
import Summary from './Components/Summary/Summary';

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
	const data = route.params;
	const layout = useWindowDimensions();
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: 'expenses', title: 'Expenses', data },
		{ key: 'members', title: 'Members', data: data },
		{ key: 'summary', title: 'Summary', data: getSummaryData() },
	]);

	return (
		<>
			<TabView style={{ flex: 1, backgroundColor: '#fff' }}
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
			/>
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