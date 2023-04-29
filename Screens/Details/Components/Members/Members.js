import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text } from "react-native"
import { randomId } from "../../../../Utils";
import Member from "./Member";
import Icon from 'react-native-vector-icons/AntDesign';
import Appstyles from '../../../../app.scss';
import { EventContext } from "../../../../EventProvider/EventProvider";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';

const Members = ({ data, setUpdateMember, isRequiredError, isUpdate }) => {
	const navigation = useNavigation();
	const [members, setMembers] = useState([]);
	const eventStore = useContext(EventContext);

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
	const removeHandler = (index, id) => {
		if (!isUpdate) {
			localRemove(index)
		} else {
			if (members[index].isDraft) {
				localRemove(index)
			}
			else {
				removeFromDb(id)
			}
		}
	};

	const localRemove = (index) => {
		const copyMembers = [...members];
		copyMembers.splice(index, 1)
		setMembers(copyMembers)
		if (setUpdateMember) {
			setUpdateMember(copyMembers)
		}
	};
	const removeFromDb = async (memberId) => {
		const memberDoc = doc(FirebaseDB, "trips", data.id, "members", memberId);
		await deleteDoc(memberDoc).then(() => {
			alert("Member deleted")
		});
		// navigation.navigate('Dashboard')
	};
	const isLastItem = (index) => {
		return members.length === index + 1;
	};
	const addMembers = () => {
		setMembers([...members, { name: '', id: randomId(), isDraft: isUpdate || false }])
	};
	const isLastMember = (e) => {
		return members.length == 1;
	};
	const addNewMemberToDb = async (name) => {
		if (name.length) {
			const membersCollection = collection(FirebaseDB, "trips", data.id, "members");
			try {
				const docRef = await addDoc(membersCollection, { name })
				alert("Member added")
				navigation.navigate('Dashboard')
			} catch (error) {
				console.log("members add error", error);
			}
		}
	};
	const updateNewMemberToDb = async (name, memberId) => {
		if (name.length) {
			const memberDoc = doc(FirebaseDB, "trips", data.id, "members", memberId);
			try {
				await updateDoc(memberDoc, { name })
				alert("Member updated")
				navigation.navigate('Dashboard')
			} catch (error) {
				console.log("members add error", error);
			}
		}
	};
	useEffect(() => {
		setMembers(data.members || [])
	}, [data.members]);
	return (
		<ScrollView>
			<FlatList
				data={members}
				renderItem={
					({ item, index }) => <Member
						data={item}
						isUpdate={isUpdate}
						handleValueChange={(val) => changeHandler(val, index)}
						removeMember={() => removeHandler(index, item.id)}
						isLastItem={isLastMember}
						addNewMemberToDb={addNewMemberToDb}
						updateNewMemberToDb={updateNewMemberToDb} />
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