import { useState } from "react";
import { FlatList, Pressable, ScrollView, Text } from "react-native"
import { randomId } from "../../../../Utils";
import Member from "./Member";
import Icon from 'react-native-vector-icons/AntDesign';
import Appstyles from '../../../../app.scss';

const Members = ({ data, setUpdateMember, isRequiredError }) => {
	const [members, setMembers] = useState(data);

	const changeHandler = (val, index) => {
		const copyMembers = [...members];
		copyMembers[index]['name'] = val;
		setMembers(copyMembers)
		if (setUpdateMember) {
			setUpdateMember(copyMembers)
		}
		// if (isLastItem(index)) {
		// 	addMembers();
		// }
	}
	const removeHandler = (index) => {
		const copyMembers = [...members];
		copyMembers.splice(index, 1)
		setMembers(copyMembers)
		if (setUpdateMember) {
			setUpdateMember(copyMembers)
		}
	};
	const isLastItem = (index) => {
		return members.length === index + 1;
	};
	const addMembers = () => {
		setMembers([...members, { name: '', id: randomId() }])
	};
	const isLastMember = (e) => {
		return members.length == 1;
	};
	return (
		<ScrollView>
			<FlatList
				data={members}
				renderItem={
					({ item, index }) => <Member
						data={item}
						handleValueChange={(val) => changeHandler(val, index)}
						removeMember={() => removeHandler(index)}
						isLastItem={isLastMember} />
				}
				keyExtractor={item => item.id}
			/>

			{isRequiredError && (
				<Text style={[Appstyles.error_text_color, Appstyles.mt_5]}>One member name is required</Text>
			)}
			<Pressable
				style={[Appstyles.flex_direction_row, Appstyles.p_15, Appstyles.align_items_center]}
				onPress={addMembers}>
				<Icon
					name="plus"
					size={20}
					color="#000"
				/>
				<Text style={Appstyles.ml_10}>Member</Text>
			</Pressable>
		</ScrollView>
	)
}

export default Members;