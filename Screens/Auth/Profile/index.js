import { SafeAreaView, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Appstyles from '../../../app.scss';
import { useEffect, useState } from 'react';
import { Auth } from '../../../firebaseConfig';
import { getAuth, signOut, updateProfile } from "firebase/auth";


const Profile = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	const [currentUser, setCurrentUser] = useState("");

	const handleProfileUpdate = async () => {
		try {
			const res = await updateProfile(currentUser, {
				displayName: name,
			})
		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};

	const logout = async () => {
		await signOut(Auth)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => alert(error.message));
	}

	useEffect(() => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (user) {
			console.log(user);
			setEmail(user.email)
			setName(user.displayName || '')
			setCurrentUser(user)
		} else {
			console.log('error');
			// No user is signed in.
		}
	}, [])



	return (
		<SafeAreaView style={styles.container}>

			<Icon
				name="person-circle-outline"
				size={100}
				color="#212121"
				style={[Appstyles.text_center, Appstyles.mt_30]}
			/>
			<View style={Appstyles.p_30}>
				<View style={styles.input_wrapper}>
					<Icon
						name="person-outline"
						size={25}
						color="#9d9d9d"
					/>
					<TextInput
						style={[styles.slikInput]}
						placeholder="Full Name"
						placeholderTextColor="#a5a5a5"
						autoCapitalize="none"
						value={name}
						onChangeText={(name) => setName(name)}
					/>
				</View>
				<View style={styles.input_wrapper}>
					<Icon
						name="at"
						size={25}
						color="#9d9d9d"
					/>
					<TextInput
						style={[styles.slikInput]}
						placeholder="Email ID"
						placeholderTextColor="#a5a5a5"
						autoCapitalize="none"
						value={email}
						onChangeText={(email) => setEmail(email)}
						editable={false}
					/>
				</View>
				{/* <View style={styles.input_wrapper}>
					<Icon
						name="lock-closed-outline"
						size={25}
						color="#9d9d9d"
					/>
					<TextInput
						style={[styles.slikInput, styles.passwordInput]}
						placeholder="Password"
						placeholderTextColor="#a5a5a5"
						secureTextEntry={!showPassword}
						autoCapitalize="none"
						value={password}
						onChangeText={(password) => setPassword(password)}
					/>
					{showPassword ? (
						<Icon
							name="eye-outline"
							size={25}
							color="#9d9d9d"
							style={styles.passwordEye}
							onPress={() => setShowPassword(false)}
						/>
					) : (
						<Icon
							name="eye-off-outline"
							size={25}
							color="#9d9d9d"
							style={styles.passwordEye}
							onPress={() => setShowPassword(true)}
						/>
					)}
				</View> */}
				<Pressable style={[Appstyles.button, Appstyles.mt_20]} onPress={handleProfileUpdate}>
					<Text style={Appstyles.buttonText}>Update</Text>
				</Pressable>
			</View>
			<Pressable
				onPress={logout}
				style={[Appstyles.flex_direction_row, Appstyles.align_items_center, Appstyles.justify_content_center, Appstyles.gap_10, Appstyles.p_30]}>
				<Icon
					name="log-out-outline"
					size={22}
					color="#212121"
				/>
				<Text>Log Out</Text>
			</Pressable>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	welcomeBkg: {
		width: 250,
		height: 250
	},
	boldText: {
		fontWeight: 'bold'
	},
	bottomPosition: {
		position: 'absolute',
		bottom: 20,
		right: 10,
		padding: 20,
		display: 'flex',
	},
	slikInput: {
		borderBottomColor: '#d4d4d4',
		borderBottomWidth: 1,
		flexGrow: 1,
		paddingBottom: 8
	},
	input_wrapper: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		marginTop: 20,
		position: 'relative'
	},
	googleIcon: {
		height: 20,
		width: 20
	},
	passwordInput: {
		paddingRight: 30
	},
	passwordEye: {
		position: 'absolute',
		right: 0,
		bottom: 3,
		zIndex: 1
	}
})

export default Profile;