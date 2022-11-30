import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  useColorScheme,
} from "react-native";

// @ts-ignore
interface Props {
  id: string;
  title: string;
  description: string;
  date: string;
  comments: any[];
  path: string;
  reply: (reply: object | null) => void;
  border: string;
  setBorder: (borderId: string) => void;
}

export const Comment: React.FC<Props> = ({
  id,
  title,
  description,
  date,
  comments,
  path,
  reply,
  border,
  setBorder,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const themeTextStyle = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <View>
      <TouchableOpacity style={[styles.container, {borderWidth: border === id ? 1 : 0}]}>
        <Text style={[styles.titleText, themeTextStyle]}>{title}</Text>
        <Text style={[styles.descriptionText, themeTextStyle]}>{description}</Text>
        <View style={styles.footerContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <TouchableOpacity
            onPress={() => {
              reply({title, path});
              setBorder(id);
            }}>
            <Text style={styles.buttonText}>Ответить</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.replyContainer}>
        {comments &&
          Object.keys(comments)
            .sort((a, b) => {
              if (comments[a].date < comments[b].date) {
                return 1;
              }
              if (comments[a].date > comments[b].date) {
                return -1;
              }
              return 0;
            })
            .map(index => {
              return (
                <Comment
                  key={index}
                  id={index}
                  title={comments[index].title}
                  description={comments[index].description}
                  date={comments[index].date}
                  comments={comments[index].comments}
                  path={`${path}/comments/${index}`}
                  reply={reply}
                  border={border}
                  setBorder={setBorder}
                />
              );
            })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: '#D2D2D2',
    marginHorizontal: 47,
  },
  titleText: {
    fontFamily: 'Raleway-SemiBold',
    marginHorizontal: 11,
    marginTop: 11,
    fontSize: 12,
  },
  descriptionText: {
    fontFamily: 'Raleway-Light',
    marginHorizontal: 11,
    marginVertical: 5,
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    marginHorizontal: 11,
    marginBottom: 7,
  },
  dateText: {
    fontFamily: 'Raleway-Light',
    fontSize: 10,
    color: '#8F8F8F',
  },
  buttonText: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 10,
    color: '#8F8F8F',
    marginLeft: 12,
  },
  replyContainer: {
    marginLeft: 5,
    marginVertical: 5,
  },
});
