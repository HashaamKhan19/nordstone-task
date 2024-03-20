import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import fonts from '../../../utils/fonts';
import TextField from '../../../components/shared/TextField';
import dimensions from '../../../utils/dimensions';
import BasicButton from '../../../components/shared/Button';
import {uploadText} from '../../../services/firebase/textUpload';
import {notification} from '../../../components/notification';
import deviceStorage from '../../../utils/deviceStorage';
import firestore from '@react-native-firebase/firestore';
import colors from '../../../utils/colors';

const TextUpload = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleUpload = async () => {
    setLoading(true);
    if (!text) {
      notification(
        (type = 'warning'),
        (title = 'Empty Field!'),
        (textBody = 'Please write something to upload!'),
        1000,
      );
      setLoading(false);
      return;
    }

    try {
      await uploadText(text);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      setText('');
    }
  };

  const getData = async () => {
    const userInfoString = await deviceStorage.loadItem('user');
    if (!userInfoString) {
      setLoading(false);
      return null;
    }
    firestore()
      .collection('Text')
      .where('email', '==', userInfoString?.email)
      .onSnapshot(querySnapshot => {
        const documents = [];
        querySnapshot.forEach(doc => {
          documents.push({...doc.data()});
        });
        setList(documents);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log('list of text', list);

  return (
    <View style={styles.container}>
      <View style={styles.secCont}>
        <Text style={styles.txt}>Upload a text</Text>

        <View style={styles.body}>
          <TextField
            value={text}
            onChange={text => setText(text)}
            label={'Write something'}
          />
        </View>

        <BasicButton text={'Upload'} onPress={handleUpload} loading={loading} />
      </View>

      <ScrollView contentContainerStyle={styles.mytext}>
        <Text style={styles.txt}>My Texts</Text>

        {list.map((item, index) => (
          <Text key={index} style={styles.mapping}>
            {item.text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secCont: {
    height: dimensions.Height * 0.5,
    paddingBottom: dimensions.Height * 0.04,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    marginTop: dimensions.Height * 0.04,
  },
  txt: {
    fontSize: fonts.size.font18,
    fontFamily: 'Urbanist-Bold',
    color: colors.black,
  },
  mytext: {
    width: dimensions.Width * 0.9,
    overflow: 'scroll',
    marginBottom: dimensions.Height * 0.04,
    paddingBottom: dimensions.Height * 0.04,
  },
  mapping: {
    fontSize: fonts.size.font17,
    fontFamily: 'Urbanist-Medium',
    marginVertical: dimensions.Height * 0.01,
    color: colors.black,
  },
});

export default TextUpload;
