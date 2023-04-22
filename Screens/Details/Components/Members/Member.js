import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Appstyles from '../../../../app.scss';
import Icon from 'react-native-vector-icons/EvilIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from "react";

const Member = ({ data, isUpdate, handleValueChange, removeMember, isLastItem, addNewMemberToDb, updateNewMemberToDb }) => {
	const { name, id, isDraft, isDbData } = data;
	const [copyName, setCopyName] = useState('')
	const [editable, setEditable] = useState(!isUpdate)
	const editHandler = () => {
		setEditable(!editable)
	}
	const closeEdit = () => {
		setEditable(false)
		handleValueChange(copyName)
	};
	useEffect(() => {
		if (isDraft) {
			setEditable(true)
		}
		setCopyName(name)
	}, [])

	return (
		<View style={[Appstyles.flat_row_card, Appstyles.p_5, styles.borderBottom, Appstyles.align_items_center]}>
			<TextInput
				placeholder="Member Name"
				placeholderTextColor="#929292"
				style={[Appstyles.formFieldText, Appstyles.flex_1, Appstyles.p_10]}
				onChange={(event) => handleValueChange(event.nativeEvent.text)}
				value={name}
				editable={editable}
			/>

			{isDbData && !editable && (
				<Icon
					name="pencil"
					size={25}
					color="#000"
					onPress={() => editHandler()}
					style={styles.iconMargin}
				/>
			)}
			{isDbData && editable && (
				<AntIcon
					name="check"
					size={25}
					color={name.length ? '#000' : '#ddd'}
					onPress={() => updateNewMemberToDb(name, id)}
					style={styles.iconMargin}
				/>
			)}
			{isDbData && editable && (
				<Icon
					name="close"
					size={25}
					color="#000"
					onPress={() => closeEdit()}
					style={styles.iconMargin}
				/>
			)}
			{isDraft && (
				<AntIcon
					name="check"
					size={25}
					color={name.length ? '#000' : '#ddd'}
					onPress={() => addNewMemberToDb(name)}
					style={styles.iconMargin}
				/>
			)}

			{/* the most complex thing :)  -- Need to work */}
			{!isLastItem() && !isUpdate && (
				<Icon
					name="trash"
					size={25}
					color="#000"
					onPress={() => removeMember()}
					style={styles.iconMargin}
				/>
			)}
			{!isLastItem() && (isUpdate && !editable) && (
				<Icon
					name="trash"
					size={25}
					color="#000"
					onPress={() => removeMember()}
					style={styles.iconMargin}
				/>
			)}
			{!isLastItem() && (isUpdate && isDraft) && (
				<Icon
					name="trash"
					size={25}
					color="#000"
					onPress={() => removeMember()}
					style={styles.iconMargin}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
	iconMargin: {
		marginHorizontal: 5
	}
})

export default Member;