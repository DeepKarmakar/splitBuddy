import { View, Text, StyleSheet, Pressable } from "react-native";
import Appstyles from '../../../../app.scss';
import Icon from 'react-native-vector-icons/EvilIcons';
import { GetDate } from "../../../../Utils";

const ExpenseItem = ({ data, removeExpense, updateExpense }) => {

	const { name, paidBy, date, amount, id } = data;

	return (
		<Pressable onPress={() => updateExpense(data)}>
			<View style={[Appstyles.expenseItemContainer, Appstyles.p_15, styles.borderBottom]}>
				<View style={[Appstyles.inbetween_content]}>
					<Text
						style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_b_10]}>
						{name}
					</Text>
					<Icon
						name="trash"
						size={20}
						color="#000"
						onPress={(e) => removeExpense(e, id)}
					/>
				</View>
				<View style={[Appstyles.flex_direction_row, Appstyles.align_items_center]}>
					<Text style={[Appstyles.color_grey, styles.paidByWidth]}>{paidBy.name}</Text>
					<Text style={[Appstyles.color_grey, Appstyles.flex_1]}>{date}</Text>
					<Text
						style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_0, Appstyles.m_0, Appstyles.width_100, Appstyles.text_right]}>
						{amount}
					</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	paidByWidth: {
		width: 140
	}
})

export default ExpenseItem;