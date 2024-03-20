import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import fonts from '../../../utils/fonts';
import TextField from '../../../components/shared/TextField';
import dimensions from '../../../utils/dimensions';
import BasicButton from '../../../components/shared/Button';
import {uploadText} from '../../../services/firebase/textUpload';

const TextUpload = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleUpload = async () => {
    try {
      setLoading(true);
      await uploadText(text);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
      // setText('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.txt}>Upload a text</Text>

      <View style={styles.body}>
        <TextField
          value={text}
          onChange={text => setText(text)}
          label={'Write something'}
        />
      </View>

      <View style={styles.btn}>
        <BasicButton text={'Upload'} onPress={handleUpload} loading={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    marginTop: dimensions.Height * 0.04,
  },
  txt: {
    fontSize: fonts.size.font18,
    fontFamily: 'Urbanist-Bold',
  },
});

export default TextUpload;
