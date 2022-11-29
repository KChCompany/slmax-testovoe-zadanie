import { Button, Platform, Text, TouchableOpacity, View } from "react-native";

import React, {useEffect, useState} from 'react';
import {ShowNoteButton} from '../ShowNoteButton';
import {Swipeable} from 'react-native-gesture-handler';
import {deleteNote} from '../../config/firebase';
import {Countdown} from '../Countdown';

interface Props {
  id: string;
  title: string;
  description: string;
  date: string;
}

export const Note: React.FC<Props> = ({id, title, description, date}) => {
  const [visibility, setVisibility] = useState(false);
  const [countdown, setCountdown] = useState(false);

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <View
        style={{
          margin: 0,
          alignContent: 'center',
          justifyContent: 'center',
          width: 90,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            flex: 1,
            justifyContent: 'center',
          }}
          onPress={onClick}>
          {countdown ? (
            <Countdown onStop={() => deleteNote(id)} />
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Raleway-SemiBold',
                lineHeight: 16,
                color: '#ffffff',
                textAlign: 'center',
              }}>
              Удалить
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <TouchableOpacity
      onPress={async () => {
        setVisibility(prevState => !prevState);
      }}>
      <Swipeable
        containerStyle={{
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 30,
          height: 37,
          borderColor: '#D2D2D2',
          marginVertical: 5,
        }}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, () => {
            setCountdown(prevState => !prevState);
          })
        }>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                marginLeft: 17,
                marginRight: 7,
                fontSize: 14,
                fontFamily: 'Raleway-SemiBold',
                lineHeight: 16,
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              borderRightColor: '#D2D2D2',
              borderRightWidth: 1,
              marginVertical: 11,
            }}
          />
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{
                marginLeft: 8,
                marginRight: 7,
                fontSize: 14,
                fontFamily: 'Raleway-Light',
                fontStyle: 'normal',
                paddingTop: Platform.OS === 'ios' ? 3 : 0,
                paddingBottom: Platform.OS === 'ios' ? 0 : 3,
              }}>
              {description.length < 20
                ? `${description}`
                : `${description.substring(0, 20)}...`}{' '}
            </Text>
          </View>

          <View
            style={{
              marginTop: 7,
              marginBottom: 6,
              marginRight: 13,
            }}>
            <ShowNoteButton />
          </View>
        </View>
      </Swipeable>
      {visibility && (
        <View
          style={{
            borderBottomColor: '#D2D2D2',
            borderBottomWidth: 1,
            marginHorizontal: 30,
          }}>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 17,
              marginRight: Platform.OS === 'ios' ? 52 : 20,
              fontSize: 12,
              fontFamily: 'Raleway-Light',
              fontStyle: 'normal',
              textAlign: 'right',
            }}>
            {date}
          </Text>
          <Text
            style={{
              marginTop: 9,
              marginBottom: 11,
              marginLeft: 17,
              marginRight: 26,
              fontSize: 12,
              lineHeight: 15,
              fontFamily: 'Raleway-Light',
              fontStyle: 'normal',
            }}>
            {description}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
