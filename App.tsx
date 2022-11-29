import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Header, NewNote, Note} from './src/components';
import {
  NoteType,
  subscribeNotes,
  unsubscribeNotes,
} from './src/config/firebase';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
  };

  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const subscription = subscribeNotes(notes => {
      setList(notes);
    });
    return () => unsubscribeNotes(subscription);
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1, zIndex: 0}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={{zIndex: 1}}>
            <Header />
          </View>
          <SafeAreaView style={[backgroundStyle, styles.container]}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={[backgroundStyle, styles.scrollContainer]}>
              <View style={{height: 64}} />
              {list &&
                Object.keys(list).map(index => {
                  return (
                    <Note
                      key={index}
                      id={index}
                      title={list[index].title}
                      description={list[index].description}
                      date={list[index].date}
                    />
                  );
                })}

              <View style={{height: 20}} />
            </ScrollView>
            <NewNote />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    marginTop: -35,
    zIndex: 0,
    marginBottom: -20,
  },
});

export default App;
