import { SafeAreaView, Text, View } from "react-native";
import Appstyles from '../../../../app.scss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import Checkbox from 'expo-checkbox';


const SplitSummary = ({data}) => {
    const {payTo, payBy, amount} = data;
    const [isSelected, setSelection] = useState(false);

    return (
        <SafeAreaView>
            <View style={[Appstyles.flat_row_card, isSelected ? Appstyles.green_bkg : '' ]}>
                <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                />
                <Text style={[Appstyles.flex_1, Appstyles.ml_10]}>{payBy}</Text>
                <Icon 
                    name="arrow-right-thin" 
                    size={20} 
                    color="#000"
                    style={Appstyles.flex_1}
                />
                <Text style={Appstyles.flex_1}>{payTo}</Text>
                <Text style={[Appstyles.flex_1, Appstyles.text_right]}>{amount}</Text>
            </View>
        </SafeAreaView>
    )
}

export default SplitSummary;