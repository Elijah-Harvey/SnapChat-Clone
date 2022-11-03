import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileBox = ({
  iconStyle,
  subTitle,
  iconColor = 'gray',
  iconName,
  iconName2,
  title,
  subTitleShow = false,
  style,
  styleTitle,
  iconStyle2,
  imageShow = false,
}) => {
  return (
    <View style={[styles.box, style]}>
      {imageShow === true ? (
        <Image
          source={require('../assets/friends.png')}
          style={styles.image}
        />
      ) : null}
      <Ionicons
        name={iconName}
        size={'40%'}
        style={[
          {
            alignSelf: 'center',
            left: '30%',
            color: iconColor,
            opacity: 0.6,
          },
          iconStyle,
        ]}
      />
      <Text
        style={[
          styles.smallTitle,
          styleTitle,
          styleTitle === true ? { top: '20%' } : { justifyContent: 'center' },
        ]}
      >
        {title}
      </Text>
      {subTitleShow === true ? (
        <Text style={styles.smallText}>{subTitle}</Text>
      ) : null}
      <Ionicons
        name={iconName2}
        size={'35%'}
        style={[
          {
            alignSelf: 'center',
            right: '5%',
            position: 'absolute',
            opacity: 0.6,
            color: 'gray',
          },
          iconStyle2,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    height: '15%',
    width: '93%',
    borderRadius: 8,
    alignSelf: 'center',
    shadowColor: 'gray',
    shadowOffset: { width: -0.1, height: 0.1 },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  smallTitle: {
    fontSize: 17,
    left: '20%',
    fontWeight: '500',
    position: 'absolute',
  },
  smallText: {
    bottom: '20%',
    left: '20%',
    fontWeight: '500',
    position: 'absolute',
    color: 'gray',
  },
  image: {
    height: '60%',
    width: '100%',
    position: 'absolute',
    bottom: '30%',
  },
});

export default ProfileBox;
