import { useState } from "react";
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Appstyles from '../../../app.scss';
import FormField from '../../../Components/FormInputs/FormField';
import { formData } from '../../../Components/FormInputs/formData';
import Members from "../../Details/Components/Members/Members";
import * as ImagePicker from 'expo-image-picker';

const AddTrip = () => {
	const [formValues, handleFormValueChange, setFormValues] = formData({
		title: '',
		description: '',
	})
	const [members, setMembers] = useState([{ name: '', id: 1 }]);
	const [image, setImage] = useState(null);

	const handleSubmit = () => {
		console.log(formValues);
		console.log(members);
	}

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};


	return (
		// <SafeAreaView>
		<ScrollView style={[styles.container, Appstyles.full_width, Appstyles.d_flex]}>
			<View style={[Appstyles.full_width, Appstyles.d_flex, Appstyles.mb_20]}>
				<FormField
					label='Title'
					formKey='title'
					placeholder='Trip Title'

					handleFormValueChange={handleFormValueChange}
				/>
				<FormField
					label='Description'
					formKey='description'
					placeholder='Trip description'
					textInputProps={{
						autoCapitalize: "none"
					}}
					handleFormValueChange={handleFormValueChange}
					type="textarea"
				/>
				<Pressable onPress={pickImage}>
					<View style={[styles.mediaContainer, Appstyles.justify_content_between, Appstyles.align_items_center]}>
						{image ?
							(
								<Image source={{ uri: image }} style={styles.uploadImage} />
							) : (
								<Icon
									name="upload"
									size={40}
									color="#000"
									style={Appstyles.mt_30}
								/>
							)
						}
						<Text style={[Appstyles.mt_10]}>Upload Your Trip Image</Text>
					</View>
				</Pressable>
				<Text style={[Appstyles.h3, Appstyles.p_t_b_10, Appstyles.mt_10, styles.borderBottomDashed]}>Add Members</Text>
				<Members data={members} setUpdateMember={setMembers} />
			</View>
			<Button
				title="Add Trip"
				onPress={handleSubmit}
				style={Appstyles.mt_10}
			/>
		</ScrollView>
		// </SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 15,
		paddingBottom: 20,
	},
	header: {
		fontSize: 20,
		paddingTop: 30
	},
	formText: {
		fontSize: 20,
		padding: 10,
		paddingLeft: 0
	},
	borderBottomDashed: {
		borderStyle: 'dashed',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
	mediaContainer: {
		borderStyle: "dashed",
		borderWidth: 2,
		borderColor: '#ddd',
		padding: 10,
		backgroundColor: '#F2F2F2',
		marginTop: 15,
		height: 150
	},
	uploadImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	}
})

export default AddTrip;