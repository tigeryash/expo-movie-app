import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-5xl text-dark-100 font-bold">Welcome!</Text>
      <Text className="text-5xl text-dark-200 font-bold mt-4">
        This is red!
      </Text>
    </View>
  );
}
