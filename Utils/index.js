import moment from "moment";

export const randomId = function (length = 10) {
	return Math.random().toString(36).substring(2, length + 2);
};

export const GetDate = (date) => {
	if (date?.seconds) {
		serverDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
		return moment(serverDate).format('DD/MM/YYYY');
	}
	return 'Invalid date'
}