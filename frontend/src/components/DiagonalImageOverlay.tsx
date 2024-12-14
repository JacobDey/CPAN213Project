import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, LayoutChangeEvent } from "react-native";
import Svg, { Path } from "react-native-svg";

// component props
type DiagonalImageOverlayProps = {
    image: string;
};

// component definition
const DiagonalImageOverlay = ({ image }: DiagonalImageOverlayProps) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 200 });

    // handle layout changes
    const handleLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ width, height: 200 });
    };

    // generate exponential path
    const generateExponentialPath = (width: number, height: number) => {
        const a = height / 2;
        const b = 0.01;
        let path = `M 0 ${height}`;

        for (let x = 0; x <= width; x++) {
            const y = height/2 + a*Math.exp(b * -x);
            path += ` L ${x} ${y}`;
        }

        path += ` L ${width} ${height} Z`;
        return path;
    };

    // render component
    return (
        <View style={styles.container} onLayout={handleLayout}>
            <ImageBackground source={{ uri: image }} style={styles.imageBackground} resizeMode="cover">
                <Svg height={dimensions.height} width={dimensions.width}>
                    <Path d={generateExponentialPath(dimensions.width, dimensions.height)} fill="#282549" />
                </Svg>
            </ImageBackground>
        </View>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0
    },
    imageBackground: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default DiagonalImageOverlay;
