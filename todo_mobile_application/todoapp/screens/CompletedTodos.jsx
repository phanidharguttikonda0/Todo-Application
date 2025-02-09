import { View, FlatList, Text } from "react-native";
import { styles } from './styles';
import data from "./data";
import Todo from "./Todo";
export default function CompletedTodos({ navigation }) {


    return <View style={styles.container}>
        <View style={styles.side}>
            <Text style={{ color: "#f1f5f9", fontSize: 18, marginBottom: 8 }}> Completed Todos</Text>
        </View>
        <FlatList
            data={data} // The list data
            contentContainerStyle={styles.flat1}
            keyExtractor={(item) => item._id.toString()} // Unique key for each item
            renderItem={({ item, index }) => (<Todo
                title={item.title}
                description={item.description}
                status={item.status}
                startTime={item.startTime}
                endTime={item.endTime}
            />)}
            showsVerticalScrollIndicator={true}
            removeClippedSubviews={false}  // Try this if items are still clipping
        />

    </View>

}