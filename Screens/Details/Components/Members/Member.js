import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Appstyles from '../../../../app.scss';
import Icon from 'react-native-vector-icons/EvilIcons';

const Member = ({ data, handleValueChange, removeMember, isLastItem }) => {
	const { name } = data;
	return (
		<View style={[Appstyles.flat_row_card, Appstyles.p_5, styles.borderBottom, Appstyles.align_items_center]}>
			<TextInput
				placeholder="Member Name"
				placeholderTextColor="#929292"
				style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_10]}
				onChange={(event) => handleValueChange(event.nativeEvent.text)}
				value={name}
			/>
			{!isLastItem() && (
				<Icon
					name="trash"
					size={20}
					color="#000"
					onPress={removeMember}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	}
})

export default Member;