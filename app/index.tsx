
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
 
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                fontFamily: "SpaceMono-Regular",
                fontSize: 25,
                }}
            >
                Finance App
            </Text>
            <Link href="/(tabs)/home" style={{ marginTop: 20 }}>
                Sign In
            </Link>
        </View>
    );
}
