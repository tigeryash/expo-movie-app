import { icons } from "@/constants/icons";
import { View, Text, Image, TextInput } from "react-native";

type SearchBarProps = {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
}: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="size-5 "
        tintColor="#ab8bff"
        resizeMode="contain"
      />
      <TextInput
        onPress={onPress}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white "
      />
    </View>
  );
};

export default SearchBar;
