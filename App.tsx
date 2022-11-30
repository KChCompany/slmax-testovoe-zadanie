import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Header, NewNote, Note} from './src/components';
import {subscribeNotes, unsubscribeNotes} from './src/config/firebase';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000000' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
  };
  const [reply, setReply] = useState(null);
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
          <View style={styles.headerContainer}>
            <Header />
          </View>
          <SafeAreaView style={[backgroundStyle, styles.container]}>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={[
                backgroundStyle,
                styles.scrollContainer,
                {marginBottom: reply ? 0 : -20},
              ]}>
              <View style={{height: 64}} />
              {list &&
                Object.keys(list)
                  .sort((a, b) => {
                    if (list[a].date < list[b].date) {
                      return 1;
                    }
                    if (list[a].date > list[b].date) {
                      return -1;
                    }
                    return 0;
                  })
                  .map(index => {
                    return (
                      <Note
                        key={index}
                        id={index}
                        title={list[index].title}
                        description={list[index].description}
                        date={list[index].date}
                        comments={list[index].comments}
                        reply={reply => setReply(reply)}
                      />
                    );
                  })}
              <View style={{height: 20}} />
            </ScrollView>
            <NewNote reply={reply} />
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
  },
  headerContainer: {
    zIndex: 1,
  },
});

export default App;
