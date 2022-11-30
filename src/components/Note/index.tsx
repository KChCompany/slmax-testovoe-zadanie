import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import React, {useState} from 'react';
import {ShowNoteButton} from '../ShowNoteButton';
import {Swipeable} from 'react-native-gesture-handler';
import {deleteNote} from '../../config/firebase';
import {Countdown} from '../Countdown';
import {Comment} from '../Comment';

interface Props {
  id: string;
  title: string;
  description: string;
  date: string;
  comments: any[];
  reply: (reply: object | null) => void;
  border: string;
  setBorder: (borderId: string) => void;
}

export const Note: React.FC<Props> = ({
  id,
  title,
  description,
  date,
  comments,
  reply,
  border,
  setBorder,
}) => {
  const [visibility, setVisibility] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const themeTextStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const themeBackgroundStyle = {
    borderColor: isDarkMode ? '#363636' : '#D2D2D2',
    backgroundColor: isDarkMode ? '#363636' : '#ffffff',
  };

  const renderRightActions = (
    progress: any,
    dragX: any,
    onClick: () => void,
  ) => {
    return (
      <TouchableOpacity style={styles.deleteButtonContainer} onPress={onClick}>
        {countdown ? (
          <Countdown
            onStop={() => {
              deleteNote(id).then(() => {
                reply(null);
                setBorder('');
              });
            }}
          />
        ) : (
          <Text style={styles.deleteButtonText}>Удалить</Text>
        )}
      </TouchableOpacity>
    );
  };
  const cleanComment = (comments: any) => {
    if (comments) {
      const first = Object.keys(comments).filter((value, index) => {
        return index === 0;
      })[0];
      let result = JSON.parse(JSON.stringify(comments));
      delete result[first].comments;
      return result;
    }
    return null;
  };
  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          setVisibility(prevState => !prevState);
          setCommentVisibility(() => false);
          reply(null);
        }}>
        <Swipeable
          containerStyle={[styles.swipeContainer, themeBackgroundStyle]}
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, () => {
              setCountdown(prevState => !prevState);
            })
          }>
          <View style={[styles.container, themeBackgroundStyle]}>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, themeTextStyle]}>{title}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.shortDescriptionContainer}>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={[styles.shortDescriptionText, themeTextStyle]}>
                {description.length < 20
                  ? `${description}`
                  : `${description.substring(0, 20)}...`}{' '}
              </Text>
            </View>
            <View style={styles.showNoteButtonContainer}>
              <ShowNoteButton />
            </View>
          </View>
        </Swipeable>
      </TouchableOpacity>
      {visibility && (
        <View>
          <TouchableOpacity
            style={[
              styles.fullDescriptionContainer,
              {borderBottomWidth: id === border ? 1 : 0},
            ]}
            onPress={() => {
              reply({title, path: `${id}`});
              setBorder(id);
            }}>
            <Text style={[styles.dateText, themeTextStyle]}>{date}</Text>
            <Text style={[styles.fullDescriptionText, themeTextStyle]}>
              {description}
            </Text>
          </TouchableOpacity>
          {comments &&
            Object.keys(comments)
              .filter((value, index, array) =>
                commentVisibility ? true : index === 0,
              )
              .map(index => {
                const commentsDepth: number = (commentsArray: object) => {
                  if (commentsArray) {
                    const i = Object.keys(commentsArray)[0];
                    return 1 + commentsDepth(commentsArray[i].comments);
                  } else {
                    return 0;
                  }
                };
                return (
                  <View key={index}>
                    <Comment
                      id={index}
                      title={comments[index].title}
                      description={comments[index].description}
                      date={comments[index].date}
                      comments={
                        commentVisibility
                          ? comments[index].comments
                          : cleanComment(comments[index].comments)
                      }
                      path={`${id}/comments/${index}`}
                      reply={reply}
                      border={border}
                      setBorder={borderId => {
                        setBorder(borderId);
                      }}
                    />
                    {(commentsDepth(comments[index].comments) > 1 ||
                      Object.keys(comments).length > 1) &&
                      !commentVisibility && (
                        <TouchableOpacity
                          style={styles.showMoreContainer}
                          onPress={() =>
                            setCommentVisibility(prevState => !prevState)
                          }>
                          <View style={styles.showMoreLine} />
                          <Text style={styles.showMoreText}>
                            Показать все ответы
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                );
              })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  swipeContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 30,
    height: 37,
    marginVertical: 5,
  },
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  titleText: {
    marginLeft: 17,
    marginRight: 7,
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
    lineHeight: 16,
  },
  separator: {
    borderRightColor: '#D2D2D2',
    borderRightWidth: 1,
    marginVertical: 11,
  },
  shortDescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  shortDescriptionText: {
    marginLeft: 8,
    marginRight: 7,
    fontSize: 14,
    fontFamily: 'Raleway-Light',
    fontStyle: 'normal',
    paddingTop: Platform.OS === 'ios' ? 3 : 0,
    paddingBottom: Platform.OS === 'ios' ? 0 : 3,
  },
  showNoteButtonContainer: {
    marginTop: 7,
    marginBottom: 6,
    marginRight: 13,
  },
  fullDescriptionContainer: {
    marginHorizontal: 30,
    borderColor: '#D2D2D2',
  },
  dateText: {
    marginTop: 5,
    marginLeft: 17,
    marginRight: Platform.OS === 'ios' ? 52 : 20,
    fontSize: 12,
    fontFamily: 'Raleway-Light',
    fontStyle: 'normal',
    textAlign: 'right',
  },
  fullDescriptionText: {
    marginTop: 9,
    marginBottom: 11,
    marginLeft: 17,
    marginRight: 26,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Raleway-Light',
    fontStyle: 'normal',
  },
  deleteButtonContainer: {
    backgroundColor: 'red',
    margin: 0,
    alignContent: 'center',
    justifyContent: 'center',
    width: 90,
  },
  deleteButtonText: {
    fontSize: 14,
    fontFamily: 'Raleway-SemiBold',
    lineHeight: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  showMoreContainer: {
    flexDirection: 'row',
    marginHorizontal: 47,
    alignItems: 'center',
  },
  showMoreLine: {
    borderBottomWidth: 1,
    width: 17,
    borderColor: '#D2D2D2',
    marginRight: 4,
  },
  showMoreText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 10,
    color: '#D2D2D2',
  },
});
