import { Stack, useRouter } from "expo-router";
import { Text, Animated, View, TouchableOpacity} from 'react-native';
import { useRef } from 'react';

const imagePath = require('../../../../assets/images/CriticXP_logo.png');

const LogoHeader = () => {
    const router = useRouter();

    const imgWidth = useRef(new Animated.Value(50)).current;
  
    function HomeClick() {
      Animated.sequence([
        Animated.timing(imgWidth, { toValue: 55, duration: 150, useNativeDriver: false }),
        Animated.timing(imgWidth, { toValue: 50, duration: 150, useNativeDriver: false }),
      ]).start(() => {
        router.push(`/game`)
      });
    }
   
    return (
      <View style={{ paddingRight: 10 }}>
        <TouchableOpacity onPress={() => HomeClick()}>
          <Animated.Image
            style={{
              width: imgWidth,      
              height: undefined,     
              aspectRatio: 1,        
              resizeMode: 'contain', 
            }}
            source={imagePath}
          />
        </TouchableOpacity>
      </View>
    );
  };
  

export default function GameStack() {
    return <Stack screenOptions={{ headerRight: () => <LogoHeader/> }}/>;
}
