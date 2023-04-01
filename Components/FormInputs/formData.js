import { useState } from "react";

export const formData = (values) => {
	const [formValues, setFormValues] = useState({
		...values
	});

	const handleFormValueChange = (key, value, isArray, parentKey, itemIndex) => {
		if (!isArray) {
			setFormValues(
				{
					...formValues,
					[key]: value
				}
			);
		} else {
			const copyValue = JSON.parse(JSON.stringify(formValues))
			copyValue[parentKey][itemIndex][key] = value;
			setFormValues(copyValue);
		}
	};

	return [
		formValues,
		handleFormValueChange,
		setFormValues,
	]
};