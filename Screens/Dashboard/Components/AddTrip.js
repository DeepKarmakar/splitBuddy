import { useState } from "react";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Appstyles from '../../../app.scss';
import FormField from '../../../Components/FormInputs/FormField';
import { formData } from '../../../Components/FormInputs/formData';
import Members from "../../Details/Components/Members/Members";
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { Firebase, FirebaseDB } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { randomId } from "../../../Utils";
import { useNavigation } from '@react-navigation/native';


const AddTrip = () => {
	const navigation = useNavigation();
	const auth = getAuth();
	const currentUserId = auth.currentUser.uid;
	const [formValues, handleFormValueChange, setFormValues] = formData({
		title: '',
		description: '',
	})
	const [members, setMembers] = useState([{ name: '', id: randomId() }]);
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [coverImg, setCoverImg] = useState('');
	const [requiredError, setRequiredError] = useState({
		title: false,
		members: false
	});

	const pickImage = async (e) => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			const uploadimg = uploadImage(result.assets[0].uri)
		}
	};

	const uploadImage = async (file) => {
		setUploading(true)
		const response = await fetch(file);
		const blob = await response.blob();
		var ref = Firebase.storage().ref().child("trip-images/" + randomId()).put(blob).then((snapshot) => {
			snapshot.ref.getDownloadURL().then(function (downloadURL) {
				setCoverImg(downloadURL);
			});
		});
		try {
			await ref;
		} catch (err) {
			console.log(err);
		}

		setUploading(false)
	}

	const handleSubmit = () => {
		if (uploading) {
			alert("Image is uploading");
			return
		}
		if (isInValidForm()) {
			return
		}
		console.log(isInValidForm(), ' validation false');

		const data = { ...formValues };
		data.uid = currentUserId;
		data.date = serverTimestamp()
		data.coverImage = coverImg;
		addFirebaseDoc(data)
	}

	const isInValidForm = () => {

		// title Validation
		let isInValidTitle = formValues.title.trim() == '';

		// Members Validation
		let isInValidMember = members.every(member => {
			return member.name.trim() == ''
		})

		setRequiredError({ title: isInValidTitle, members: isInValidMember });

		return (isInValidTitle || isInValidMember);
	};

	const addFirebaseDoc = async (data) => {

		try {
			const docRef = await addDoc(collection(FirebaseDB, "trips"), data);

			// Add Members
			const membersCollection = collection(FirebaseDB, "trips", docRef.id, "members");
			await members.forEach(async (data) => {
				try {
					await addDoc(membersCollection, { name: data.name })
				} catch (error) {
					console.log("members add error", error);
				}
			});

			navigation.navigate('Dashboard')

		} catch (e) {
			console.error("Error adding document: ", e);
		} finally {
			clearForm()
		}
	}

	const clearForm = () => {
		setFormValues({
			title: '',
			description: '',
		});
		setMembers([{ name: '', id: randomId() }]);
		setImage(null);
		setCoverImg('');
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
					isRequiredError={requiredError.title}
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
				<Pressable onPress={(e) => pickImage(e)}>
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
						<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_center, Appstyles.mt_10]}>
							<Text>Upload Your Trip Image </Text>
							<ActivityIndicator animating={uploading} />
						</View>

					</View>
				</Pressable>
				<Text style={[Appstyles.h3, Appstyles.p_t_b_10, Appstyles.mt_10, styles.borderBottomDashed]}>Add Members</Text>
				<Members
					data={members}
					setUpdateMember={setMembers}
					isUpdate={false}
					isRequiredError={requiredError.members} />
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