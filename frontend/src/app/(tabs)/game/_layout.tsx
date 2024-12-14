import { Stack, useRouter } from "expo-router";
// import react native components
import { Text, Animated, View, TouchableOpacity} from 'react-native';
// import useRef hook
import { useRef } from 'react';

// path to logo image
const imagePath = require('../../../../assets/images/CriticXP_logo.png');

const LogoHeader = () => {
    // get router
    const router = useRouter();

    // create animated value for image width
    const imgWidth = useRef(new Animated.Value(50)).current;
  
    // function to handle home click
    function HomeClick() {
      // animate image width
      Animated.sequence([
        Animated.timing(imgWidth, { toValue: 55, duration: 150, useNativeDriver: false }),
        Animated.timing(imgWidth, { toValue: 50, duration: 150, useNativeDriver: false }),
      ]).start(() => {
        // navigate to game details screen
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
  
// export default function
export default function GameStack() {
    // return stack with custom header
    return <Stack screenOptions={{ headerRight: () => <LogoHeader/> }}/>;
}
