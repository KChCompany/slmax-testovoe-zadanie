import {
  Keyboard,
  Platform,
  TextInput,
  View,
  Text,
  StyleSheet,
  useColorScheme,
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
  const isDarkMode = useColorScheme() === 'dark';
  const themeTextStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };
  const themeBackgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
  };
  return (
    <View>
      {reply && (
        <Text style={styles.replyText}>
          {'Ответ на '}
          {reply.path.includes('/comments/') ? 'коментарий' : 'заметку'}
          {' - '}
          {reply.title}
        </Text>
      )}
      <View style={[styles.container, themeBackgroundStyle]}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          multiline={false}
          placeholder={'Название'}
          placeholderTextColor={'#8F8F8F'}
          maxLength={25}
          style={[styles.titleTextInput, themeTextStyle]}
          returnKeyType={'next'}
          onSubmitEditing={() => {
            descriptionInput.current.focus();
          }}
        />
        <View style={styles.separator} />
        <View style={styles.descriptionContainer}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            multiline={true}
            placeholder={'Текст описание'}
            placeholderTextColor={'#8F8F8F'}
            ref={descriptionInput}
            returnKeyType={'default'}
            style={[styles.descriptionTextInput, themeTextStyle]}
          />
          <AddNoteButton
            onPress={async () => {
              if (reply) {
                await addComment(title, description, reply.path);
              } else {
                await addNote(title, description);
              }
              Keyboard.dismiss();
              setTitle('');
              setDescription('');
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  replyText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 12,
    marginBottom: 6,
    marginHorizontal: 30,
    color: '#8F8F8F',
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    borderColor: '#D2D2D2',
    marginBottom: 42,
  },
  titleTextInput: {
    marginHorizontal: 21,
    marginTop: Platform.OS === 'ios' ? 17 : 0,
    marginBottom: Platform.OS === 'ios' ? 7 : 0,
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
  },
  separator: {
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: 1,
    marginHorizontal: 17,
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  descriptionTextInput: {
    marginLeft: 21,
    marginTop: Platform.OS === 'ios' ? 11 : 0,
    marginBottom: Platform.OS === 'ios' ? 19 : 0,
    fontSize: 12,
    fontFamily: 'Raleway-Light',
    flex: 1,
  },
});
