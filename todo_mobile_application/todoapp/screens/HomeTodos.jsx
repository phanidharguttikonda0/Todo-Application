
import { View, StyleSheet, FlatList, Text,SafeAreaView } from "react-native"
import data from "./data";
import Todo from "./Todo";
import { styles } from "./styles";
export default function HomeTodos({ navigation }) {


    return <SafeAreaView style={styles.container}>
        <View style={styles.side}>
            <Text style={{ color: "#f1f5f9", fontSize: 18, marginBottom: 8 }}> Current Todos</Text>
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

        <View style={styles.side}>
            <Text style={{ color: "#f1f5f9", fontSize: 18, marginBottom: 8 }}> Pending Todos</Text>
        </View>

        <FlatList
            data={data} // The list data
            contentContainerStyle={styles.flat2}
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


    </SafeAreaView>

}


