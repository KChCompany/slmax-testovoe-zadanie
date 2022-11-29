import {firebase} from '@react-native-firebase/database';

const database = firebase
  .app()
  .database(
    'https://slmax-6bd0b-default-rtdb.europe-west1.firebasedatabase.app/',
  );

export interface NoteType {
  title: string;
  description: string;
  date: string;
}

export async function addNote(title: string, description: string) {
  const newReference = database.ref('/notes').push();

  console.log('Auto generated key: ', newReference.key);

  const time = new Date();
  const DD =
    time.getDate().toString().length == 1
      ? `0${time.getDate()}`
      : time.getDate().toString();
  const MM =
    time.getMonth().toString().length == 1
      ? `0${time.getMonth()}`
      : time.getMonth().toString();
  const YYYY = time.getFullYear();
  const hh =
    time.getHours().toString().length == 1
      ? `0${time.getHours()}`
      : time.getHours().toString();
  const mm =
    time.getMinutes().toString().length == 1
      ? `0${time.getMinutes()}`
      : time.getMinutes().toString();

  newReference
    .set({
      title,
      description,
      date: `${DD}.${MM}.${YYYY} ${hh}:${mm}`,
    })
    .then(() => console.log('Data updated.'));
}

export const subscribeNotes = (update = (notes: any) => {}) => {
  return database.ref('/notes').on('value', snapshot => {
    update(snapshot.val());
  });
};

export const unsubscribeNotes = (onValueChange: any) => {
  return database.ref('/notes').off('value', onValueChange);
};

export async function deleteNote(id: string) {
  await database.ref(`/notes/${id}`).remove();
}
