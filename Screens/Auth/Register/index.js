import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { welcomeBkg } from '../../../assets/images';
import Appstyles from '../../../app.scss';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Auth } from '../../../firebaseConfig';


const Register = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const handleSignUp = async () => {
		if (isValidUser()) {
			try {
				const res = await createUserWithEmailAndPassword(Auth, email, password);
				const user = res.user;
				await updateProfile(user.auth.currentUser, {
					displayName: name,
				});
			} catch (err) {
				console.error(err);
				alert(err.message);
			}
		}
	};

	const isValidUser = () => {
		if (name == '') {
			alert('Full name is required')
			return;
		}
		if (email == '') {
			alert('Email is required')
			return;
		}
		let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		if (emailRegx.test(email) === false) {
			alert("Email is not correct");
			return;
		}
		if (password == '') {
			alert('Password is required')
			return;
		}
		if (password.length < 6) {
			alert('Password Length should be at least 6 charector')
			return;
		}
		return true;
	}

	return (
		<View style={[styles.container]}>
			<View style={Appstyles.align_items_center}>
				<Image source={welcomeBkg} style={styles.welcomeBkg} />
				{/* <Text>Manage your trip with <Text style={styles.boldText}>SplitBuddy</Text></Text> */}
			</View>
			<View>
				<Text style={[Appstyles.h1, Appstyles.mb_10]}>Sign up</Text>
				<View>
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
						/>
					</View>
					<View style={styles.input_wrapper}>
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
					</View>
					<Pressable style={[Appstyles.button, Appstyles.mt_20]} onPress={handleSignUp}>
						<Text style={Appstyles.buttonText}>Continue</Text>
					</Pressable>
					<View style={[Appstyles.flex_direction_row, Appstyles.align_items_center, Appstyles.justify_content_center, Appstyles.mt_20]}>
						<Text>Joined us before?</Text>
						<Pressable onPress={() => navigation.navigate('Login')}><Text style={[Appstyles.linkText, Appstyles.ml_5]}>Login</Text></Pressable>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		position: 'relative',
		paddingHorizontal: 30,
		justifyContent: 'space-evenly'
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
});


export default Register;