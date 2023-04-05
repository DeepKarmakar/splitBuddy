import Icon from 'react-native-vector-icons/Ionicons';
import Appstyles from '../../app.scss';
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Header(pops) {
	const navigation = useNavigation();
	return (
		<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_center, Appstyles.align_items_center]}>
			<Icon
				name="person-circle-outline"
				size={35}
				color="#0164FE"
				onPress={() => navigation.navigate('Profile')}
				style={Appstyles.mr_10}
			/>
		</View>
	);
}

export default Header;