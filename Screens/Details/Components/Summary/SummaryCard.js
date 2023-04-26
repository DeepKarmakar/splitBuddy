import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Appstyles from '../../../../app.scss';
import { roundOf } from "../../../../Utils";

const SummaryCard = ({ data }) => {
	const { name, amountSpent, share } = data;
	return (
		<SafeAreaView>
			<View style={[Appstyles.flat_row_card, styles.border_bottom]}>
				<Text style={{ width: '45%' }}>{name}</Text>
				<Text style={{ color: share > 0 ? 'green' : 'red', textAlign: "right" }}>{roundOf(share)}</Text>
				{/* <Text> */}
				<Text style={{ width: 50, textAlign: "right" }}>{amountSpent}</Text>
				{/* </Text> */}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	border_bottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
})

export default SummaryCard;