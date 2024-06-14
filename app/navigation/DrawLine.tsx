import React from "react";
import { View } from "react-native";
import Svg, { Line } from "react-native-svg";

type LineProps = {
  start: { top: number; left: number };
  end: { top: number; left: number };
};

const DrawLine: React.FC<LineProps> = ({ start, end }) => {
  const width = Math.abs(end.left - start.left);
  const height = Math.abs(end.top - start.top);

  return (
    <View
      style={{
        position: "absolute",
        top: Math.min(start.top, end.top),
        left: Math.min(start.left, end.left),
        width: width,
        height: height,
        pointerEvents: "none", // Allows interactions to pass through
        zIndex: 100,
      }}
    >
      <Svg height="100%" width="100%">
        <Line
          x1={start.left < end.left ? 0 : width}
          y1={start.top < end.top ? 0 : height}
          x2={start.left < end.left ? width : 0}
          y2={start.top < end.top ? height : 0}
          stroke="blue"
          strokeWidth="8"
        />
      </Svg>
    </View>
  );
};

export default DrawLine;
