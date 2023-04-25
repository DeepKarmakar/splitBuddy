import { SafeAreaView, Text, View } from "react-native";
import Appstyles from '../../../../app.scss';

const SummaryCard = ({ data }) => {
	const { name, amountSpent } = data;
	return (
		<SafeAreaView>
			<View style={[Appstyles.flat_row_card]}>
				<Text>{name}</Text>
				<Text>{amountSpent}</Text>
			</View>
		</SafeAreaView>
	)
}

export default SummaryCard;