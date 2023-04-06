import { StyleSheet, Text, View, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GoogleIcon, welcomeBkg } from '../../../assets/images';
import Appstyles from '../../../app.scss';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../../../firebaseConfig';


const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigation = useNavigation();
	const provider = new GoogleAuthProvider();
	const [loading, setLoading] = useState(false);

	const googleSignIn = async () => {
		await signInWithPopup(Auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log(user);
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				console.log(error);
			});
	}

	const handleLogin = async () => {
		setLoading(true)
		await signInWithEmailAndPassword(Auth, email, password)
			.then((user) => {
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
				alert(error.message)
			})
			.finally(() => {
				setLoading(false)
			})
	};

	return (
		<View style={[styles.container]}>
			<View style={Appstyles.align_items_center}>
				<Image source={welcomeBkg} style={styles.welcomeBkg} />
			</View>
			<View>
				<Text style={[Appstyles.h1, Appstyles.mb_10]}>Login</Text>
				<View>
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
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry={!showPassword}
							autoCapitalize="none"
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
					<View style={[Appstyles.align_items_end, Appstyles.p_t_b_10]}>
						<Pressable
							onPress={() => navigation.navigate('ForgotPassword')}>
							<Text style={Appstyles.linkText}>Forgot Password?</Text>
						</Pressable>
					</View>
					<Pressable style={[Appstyles.button, Appstyles.flex_direction_row, Appstyles.gap_10]} onPress={handleLogin}>
						<Text style={Appstyles.buttonText}>Login</Text>
						<ActivityIndicator animating={loading} color="#fff" style={styles.loginLoader} />
					</Pressable>
					<View style={Appstyles.or_container}>
						<Text style={Appstyles.or_text}>OR</Text>
						<View style={Appstyles.or_divider}></View>
					</View>
					<Pressable
						onPress={googleSignIn}
						style={[Appstyles.button, Appstyles.googleButton, Appstyles.mb_20]}>
						<Image source={GoogleIcon} style={styles.googleIcon} />
						<Text style={[Appstyles.buttonText, Appstyles.googleButtonText]}>Login With Google</Text>
					</Pressable>
					<View style={[Appstyles.flex_direction_row, Appstyles.align_items_center, Appstyles.justify_content_center]}>
						<Text>New to SplitBuddy?</Text>
						<Pressable
							onPress={() => navigation.navigate('Register')}>
							<Text style={[Appstyles.linkText, Appstyles.ml_5]}>Register</Text>
						</Pressable>
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
	},
	loginLoader: {
		position: 'absolute',
		right: 20
	}
});


export default Login;