import React, { ReactNode, useRef } from 'react';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import styles from './styles';

interface Props {
  title: string;
  headerRight?: ReactNode;
  isFiltersVisible?: boolean;
  headerHeight?: Animated.Value<1>;
}

const Header: React.FC<Props> = ({ title, headerRight, children, headerHeight }) => {

  return (
    <Animated.View 
      style={[
        styles.container, !!headerRight ? {
          height: headerHeight?.interpolate({
            inputRange: [0, 1],
            outputRange: [150, 320],
          })
        } : {}
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        {headerRight}
      </View>

      {children}
    </Animated.View>
  );
}

export default Header;
