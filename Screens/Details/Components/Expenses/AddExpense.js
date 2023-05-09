import { View, Text, StyleSheet, TextInput, Pressable, ToastAndroid } from "react-native";
import Appstyles from '../../../../app.scss';
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import { useContext, useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../../../../firebaseConfig";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { EventContext } from "../../../../EventProvider/EventProvider";
import { GetDate } from "../../../../Utils";
import { useNavigation } from '@react-navigation/native';

const AddExpense = ({ documentId, members, isUpdate, data, closePopup }) => {
	const navigation = useNavigation();
	const [expenses, setExpenses] = useState({
		name: '',
		date: moment(new Date()).format('DD/MM/YYYY'),
		amount: '',
		paidBy: { name: '', id: '' }
	});
	const [isValid, setIsValid] = useState(false);
	const [requiredError, setRequiredError] = useState({
		name: false,
		amount: false,
		paidBy: false
	});
	const eventStore = useContext(EventContext);

	const changeHandler = (val, name) => {
		setExpenses({ ...expenses, [name]: name == 'amount' ? Number(val) : val });
	}
	const onChange = (event, selectedDate) => {
		setExpenses({ ...expenses, date: moment(selectedDate).format('DD/MM/YYYY') })
	};
	const showDatepicker = async () => {
		const formatDate = moment(expenses.date, 'DD-MM-YYYY').format('YYYY/MM/DD');
		const todateFormat = moment(formatDate, moment.defaultFormat).toDate()
		await DateTimePickerAndroid.open({
			value: isUpdate ? moment(todateFormat, moment.defaultFormat).toDate() : new Date(),
			onChange,
			mode: 'date',
			is24Hour: true,
		});
	};

	useEffect(() => {
		if (isUpdate) {
			setExpenses(data)
		}
	}, [isUpdate])

	const handAddExpense = async () => {
		if (!isValidForm()) {
			return
		}
		try {
			const addExpenseDoc = new Promise(async (resolve, reject) => {
				const expenseCopy = JSON.parse(JSON.stringify(expenses))
				const formatDate = moment(expenseCopy.date, 'DD-MM-YYYY').format('YYYY/MM/DD');
				const todateFormat = moment(formatDate, moment.defaultFormat).toDate()
				console.log(todateFormat);
				expenseCopy.date = Timestamp.fromDate(todateFormat)
				if (isUpdate) {
					const expenseDoc = doc(FirebaseDB, "trips", documentId, "expenseList", data.id)
					await updateDoc(expenseDoc, expenseCopy).then(res => {
						setExpenses({
							name: '',
							date: moment(new Date()).format('DD/MM/YYYY'),
							amount: '',
							paidBy: ''
						})
						// watchExpense()
						// eventStore.setEventDetails({ ...eventStore.eventDetails, test: 'hello' });
						// navigation.navigate('Dashboard')
						closePopup();
					})
				} else {
					const expenseCollection = collection(FirebaseDB, "trips", documentId, "expenseList")
					const membeDocRef = doc(FirebaseDB, "trips", documentId, "members", expenseCopy.paidBy.id)
					expenseCopy.paidBy = membeDocRef;
					await addDoc(expenseCollection, expenseCopy).then(res => {
						setExpenses({
							name: '',
							date: moment(new Date()).format('DD/MM/YYYY'),
							amount: '',
							paidBy: ''
						})
						// eventStore.watchExpenses(documentId)
						// eventStore.setEventDetails({ ...eventStore.eventDetails, test: 'hello' });
						// navigation.navigate('Dashboard')
						closePopup();
					})
				}
			})
			addExpenseDoc.then(res => {
				// ToastAndroid.show('Expense Added! PLease close Popup by yourself :)', ToastAndroid.SHORT);
			})
		} catch (error) {
			console.log(error);
		} finally {
			console.log("final");
		}
	};

	const isValidForm = () => {

		// name Validation
		let isInValidName = expenses.name.trim().length == '';

		// paidby Validation
		let isInValidPaidBy = expenses.paidBy.name.trim().length == '';

		// amount Validation
		let isInValidAmount = expenses.amount.length == '';

		setRequiredError({ name: isInValidName, amount: isInValidAmount, paidBy: isInValidPaidBy });

		return (!isInValidName && !isInValidPaidBy && !isInValidAmount);
	};


	return (
		<View style={[Appstyles.full_width, Appstyles.p_15]}>
			<View>
				<View>
					<TextInput
						placeholder="Title"
						placeholderTextColor="#929292"
						style={[styles.borderBottom, styles.inputHeight, Appstyles.p_b_10]}
						onChange={(event) => changeHandler(event.nativeEvent.text, 'name')}
						value={expenses.name}
					/>
					{requiredError.name && <Text style={[Appstyles.error_text_color, Appstyles.mt_5]}>Title is required</Text>}
				</View>
				<View style={[Appstyles.flex_direction_row, Appstyles.justify_content_between, styles.borderBottom, Appstyles.align_items_center, Appstyles.mt_10, Appstyles.p_b_10]}>
					<SelectDropdown
						defaultButtonText={isUpdate ? expenses.paidBy.name : 'Select Member'}
						defaultValue={isUpdate ? expenses.paidBy : ''}
						data={members}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index)
							changeHandler(selectedItem, 'paidBy')
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem.name
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item.name
						}}
						buttonStyle={{ height: 20, borderRadius: 5, backgroundColor: "white", borderWidth: 0, paddingLeft: 0, paddingRight: 0, width: 140 }}
						buttonTextStyle={{ fontSize: 14, padding: 0, marginLeft: 0, alignItems: 'stretch', textAlign: "left", color: '#949494' }}
						dropdownStyle={{ borderRadius: 5, padding: 0, marginLeft: 0 }}
						rowStyle={{ padding: 10, fontSize: 14 }}
						rowTextStyle={{ fontSize: 14 }}
					/>
					<Pressable onPress={showDatepicker}>
						<Text style={Appstyles.color_grey}>
							{expenses.date}
						</Text>
					</Pressable>
				</View>
				{requiredError.paidBy && <Text style={[Appstyles.error_text_color, Appstyles.mt_5]}>Member name is required</Text>}
				<View style={[Appstyles.mt_10]}>
					<TextInput
						placeholder="Amount"
						placeholderTextColor="#929292"
						style={[styles.borderBottom, Appstyles.p_b_10, Appstyles.m_0]}
						onChange={(event) => changeHandler(event.nativeEvent.text, 'amount')}
						value={expenses.amount.toString()}
						keyboardType="numeric"
					/>
					{requiredError.amount && <Text style={[Appstyles.error_text_color, Appstyles.mt_5]}>Amount is required</Text>}
				</View>
			</View>
			<Pressable style={[Appstyles.button, Appstyles.mt_10, Appstyles.flex_direction_row, Appstyles.gap_10]} onPress={handAddExpense}>
				<Text style={Appstyles.buttonText}>{isUpdate ? 'Update' : 'Add'}</Text>
				{/* <ActivityIndicator animating={loading} color="#fff" style={styles.loginLoader} /> */}
			</Pressable>

		</View>
	)
}

const styles = StyleSheet.create({
	borderBottom: {
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
})
export default AddExpense;