import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Appstyles from '../../app.scss';

const FormField = (props) => {
	return (
		<View style={styles.formFieldWrapper}>
			<Text style={styles.labelText}>{props.label}</Text>
			<TextInput
				placeholder={props.placeholder}
				style={styles.formFieldText}
				placeholderTextColor="#929292"
				onChange={(event) => props.handleFormValueChange(props.formKey, event.nativeEvent.text,
					props.type == "array" ? true : false, props.parentKey || null, (props.itemIndex != undefined) ? props.itemIndex : null
				)}
				{...props.textInputProps}
				multiline={props.type == "textarea"}
				numberOfLines={props.type == "textarea" ? 3 : 1}
			/>
			{props.isRequiredError && (
				<Text style={[Appstyles.error_text_color, Appstyles.mt_5]}>{props.label} is required</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	formFieldWrapper: {
		alignSelf: 'stretch',
		// flex: 1
	},
	formFieldText: {
		fontSize: 15,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 6
	},
	labelText: {
		fontSize: 15,
		marginBottom: 5,
		paddingTop: 10
	}
})

export default FormField;