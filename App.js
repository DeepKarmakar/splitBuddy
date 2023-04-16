import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Screens/Dashboard';
import Details from './Screens/Details';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import ForgotPassword from './Screens/Auth/ForgotPassword';
import { useEffect, useState } from 'react';
import { Auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Components/Header';
import Profile from './Screens/Auth/Profile';
import EventProvider from './EventProvider/EventProvider';

const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoggedin, setIsLoggedin] = useState(false);
	const [userdetails, setUserdetails] = useState({});

	const AuthStack = () => (
		<Stack.Navigator>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Register'
				component={Register}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='ForgotPassword'
				component={ForgotPassword}
				options={{ title: '' }}
			/>
		</Stack.Navigator>
	);

	const UserStack = () => (
		<EventProvider>
			<Stack.Navigator>
				<Stack.Screen
					name='Dashboard'
					component={Dashboard}
					options={{
						title: 'Dashboard',
						headerRight: () => <Header user={userdetails} />,
					}}
				/>
				<Stack.Screen
					name='Details'
					component={Details}
					options={({ route }) => ({ title: route.params.title })}
				/>
				<Stack.Screen
					name='Profile'
					component={Profile}
				/>
			</Stack.Navigator>
		</EventProvider>
	);

	useEffect(() => {
		const monitorAuth = async () => {
			await onAuthStateChanged(Auth, user => {
				if (user) {
					setIsLoggedin(true)
					setUserdetails({ name: user.displayName })
				} else {
					setIsLoggedin(false)
				}
			})
		}
		monitorAuth()
	}, []);



	return (
		<NavigationContainer>
			{isLoggedin ? <UserStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
