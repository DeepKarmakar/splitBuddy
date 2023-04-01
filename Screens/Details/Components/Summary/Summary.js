import { FlatList, SafeAreaView, Text, View } from "react-native"
import SummaryCard from "./SummaryCard";
import SplitSummary from "./SplitSummary";
import Appstyles from '../../../../app.scss';

const Summary = ({data}) => {
    return (
        <SafeAreaView>
            <FlatList
                data={data.expenseList}
                renderItem={({item}) => <SummaryCard data={item} />}
                keyExtractor={item => item.id}
            />
            <View style={Appstyles.divider} />
            <Text style={[Appstyles.p_15, Appstyles.text_bold]}>How to settle?</Text>
            <FlatList
                data={data.splitSummary}
                renderItem={({item}) => <SplitSummary data={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default Summary;