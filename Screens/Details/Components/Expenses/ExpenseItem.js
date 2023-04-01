import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Pressable } from "react-native";
import Appstyles from '../../../../app.scss';
import moment from 'moment';
import Icon from 'react-native-vector-icons/EvilIcons';
import SelectDropdown from 'react-native-select-dropdown';



const countries = ['A']

const ExpenseItem = ({ data, handleValueChange, removeExpense }) => {

	const { name, paidBy, date, amount, id } = data;

	const getDate = moment(date).format('DD/MM/YYYY');

	// const [date, setDate] = useState(new Date())
	return (
		<View style={[Appstyles.expenseItemContainer, Appstyles.p_15, styles.borderBottom]}>
			<View style={[Appstyles.inbetween_content]}>
				{/* <Text style={[Appstyles.font_weight_500, Appstyles.mb_10]}>{name}</Text> */}
				<TextInput
					placeholder="Title"
					placeholderTextColor="#929292"
					style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_b_10]}
					onChange={(event) => handleValueChange(event.nativeEvent.text, 'name')}
					value={name}
				/>
				<Icon
					name="trash"
					size={20}
					color="#000"
					onPress={removeExpense}
				/>
			</View>
			<View style={[Appstyles.flex_direction_row, Appstyles.align_items_center]}>
				<SelectDropdown
					defaultButtonText="Select Member"
					data={countries}
					onSelect={(selectedItem, index) => {
						console.log(selectedItem, index)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						// text represented after item is selected
						// if data array is an array of objects then return selectedItem.property to render after item is selected
						return selectedItem
					}}
					rowTextForSelection={(item, index) => {
						// text represented for each item in dropdown
						// if data array is an array of objects then return item.property to represent item in dropdown
						return item
					}}
					buttonStyle={{ height: 20, borderRadius: 5, backgroundColor: "white", borderWidth: 0, paddingLeft: 0, paddingRight: 0, width: 140 }}
					buttonTextStyle={{ fontSize: 14, padding: 0, marginLeft: 0, alignItems: 'stretch', textAlign: "left", color: '#949494' }}
					dropdownStyle={{ borderRadius: 5, padding: 0, marginLeft: 0 }}
					rowStyle={{ padding: 10, fontSize: 14 }}
					rowTextStyle={{ fontSize: 14 }}
				/>

				<Pressable >
					<Text style={[Appstyles.color_grey, Appstyles.flex_1]}>{getDate}</Text>
				</Pressable>

				<TextInput
					placeholder="Amount"
					placeholderTextColor="#929292"
					style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_0, Appstyles.m_0, Appstyles.width_100, Appstyles.text_right]}
					onChange={(event) => handleValueChange(event.nativeEvent.text, 'amount')}
					value={amount}
					keyboardType="numeric"
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	}
})

export default ExpenseItem;