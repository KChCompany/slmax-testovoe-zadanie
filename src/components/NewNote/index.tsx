import {
  Keyboard,
  Platform,
  TextInput,
  View,
  Text,
} from 'react-native';

import React, {useRef, useState} from 'react';

import {addComment, addNote} from '../../config/firebase';
import {AddNoteButton} from '../AddNoteButton';

interface Props {
  reply: null | {
    path: string;
    title: string;
  };
}

export const NewNote: React.FC<Props> = ({reply}) => {
  const descriptionInput = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View>
      {reply && (
        <Text
          style={{
            fontFamily: 'Raleway-SemiBold',
            fontSize: 12,
            marginBottom: 6,
            marginHorizontal: 30,
            color: '#8F8F8F',
          }}>
          {'Ответ на '}
          {reply.path.includes('/comments/') ? 'коментарий' : 'заметку'}
          {' - '}
          {reply.title}
        </Text>
      )}
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginHorizontal: 30,
          borderColor: '#D2D2D2',
          marginBottom: 42,
          backgroundColor: '#ffffff',
        }}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          multiline={false}
          placeholder={'Название'}
          maxLength={25}
          style={{
            marginHorizontal: 21,
            marginTop: Platform.OS === 'ios' ? 17 : 0,
            marginBottom: Platform.OS === 'ios' ? 7 : 0,
            fontSize: 14,
            fontFamily: 'Raleway-SemiBold',
          }}
          returnKeyType={'next'}
          onSubmitEditing={() => {
            descriptionInput.current.focus();
          }}
        />
        <View
          style={{
            borderBottomColor: '#D2D2D2',
            borderBottomWidth: 1,
            marginHorizontal: 17,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline={true}
            placeholder={'Текст описание'}
            ref={descriptionInput}
            returnKeyType={'default'}
            style={{
              marginLeft: 21,
              marginTop: Platform.OS === 'ios' ? 11 : 0,
              marginBottom: Platform.OS === 'ios' ? 19 : 0,
              fontSize: 12,
              fontFamily: 'Raleway-Light',
              flex: 1,
            }}
          />
          <AddNoteButton
            onPress={() => {
              if (reply) {
                addComment(title, description, reply.path);
              } else {
                addNote(title, description).then(() => {
                  Keyboard.dismiss();
                  setTitle('');
                  setDescription('');
                });
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};
