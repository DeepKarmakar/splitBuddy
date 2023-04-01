import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Appstyles from '../../../app.scss';
import {mandarmani} from '../../../assets/images';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';



const Card = ({data}) => {
    const navigation = useNavigation();

    const {title, date, coverImage, id} = data;
    const getDate = moment(date).format('DD/MM/YYYY');
    
    return (
        <TouchableOpacity 
            style={styles.cardContainer}
            onPress={() => navigation.navigate('Details', data)}>
            <View style={[Appstyles.flex_direction_row]}>
                <Image source={coverImage} style={[styles.cardImage]} />
                <View style={[Appstyles.justify_content_center, Appstyles.ml_10]}>
                    <Text style={[Appstyles.h2]}>{title}</Text>
                    <Text style={[Appstyles.date]}>{getDate}</Text>
                </View>
            </View>

            <Icon 
                name="right" 
                size={20} 
                color="#000" 
                style={styles.bottomPosition}
            />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginTop: 15,
        borderRadius: 4,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        backgroundColor: 'white',
    },
    cardImage: {
        width: 65,
        height: 65,
        borderRadius: 50
    }
})

export default Card;