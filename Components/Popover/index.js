import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, Modal, Text, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AddTrip from '../../Screens/Dashboard/Components/AddTrip';
import Appstyles from '../../app.scss';

const Popover = ({ title, content, isVisible, onClosePopup, isForceClose, openHandler }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const closeModal = () => {
		setModalVisible(!modalVisible);
		if (isVisible) {
			onClosePopup();
		}
	};

	useEffect(() => {
		if (isVisible) {
			setModalVisible(true)
		}

	}, [isVisible])

	useEffect(() => {
		if (isForceClose) {
			setModalVisible(!modalVisible);
		}
	}, [isForceClose])



	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
				style={styles.backShadow}>

				<View style={styles.centeredView}>
					<View style={[styles.modalView]}>
						<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, Appstyles.full_width, Appstyles.divider, Appstyles.p_15, Appstyles.mb_10, styles.borderBottomDashed]}>
							<Text style={[styles.modalText]}>{title}</Text>
							<Pressable
								onPress={closeModal}>
								<Icon
									name="close"
									size={20}
									color="#000"
								/>
							</Pressable>
						</View>
						{content}
					</View>
				</View>
			</Modal>

			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.touchableOpacityStyle}
				onPress={() => { setModalVisible(true); openHandler && openHandler() }}
			>
				<Icon
					name="pluscircle"
					size={45}
					color="#000"
					style={styles.bottomPosition}
				/>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	touchableOpacityStyle: {
		position: 'absolute',
		width: 45,
		height: 47,
		alignItems: 'center',
		justifyContent: 'center',
		right: 10,
		bottom: 10,
	}, centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		flexDirection: 'column',
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	},
	modalView: {
		flex: 1,
		alignSelf: 'stretch',
		marginTop: 45,
		backgroundColor: 'white',
		borderTopEndRadius: 20,
		borderTopStartRadius: 20,

		alignItems: 'flex-start',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 18,
		fontWeight: 600,
	},
	borderBottomDashed: {
		borderStyle: 'dashed',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	}
})

export default Popover;