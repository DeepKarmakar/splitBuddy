import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Screens/Dashboard';
import Details from './Screens/Details';
import Register from './Screens/Auth/Register';
import Login from './Screens/Auth/Login';
import ForgotPassword from './Screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
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
				<Stack.Screen
					name='Dashboard'
					component={Dashboard}
					options={{ title: 'Dashboard' }}
				/>
				<Stack.Screen
					name='Details'
					component={Details}
					options={({ route }) => ({ title: route.params.title })}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
