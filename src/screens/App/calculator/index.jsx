import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import dimensions from '../../../utils/dimensions';
import fonts from '../../../utils/fonts';
import BasicButton from '../../../components/shared/Button';
import TextField from '../../../components/shared/TextField';
import Dropdown from '../../../components/shared/Dropdown';
import {notification} from '../../../components/notification';
import {calculateData} from '../../../api';

const Calculator = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const operations = ['Add', 'Subtract', 'Multiply', 'Divide'];

  const calculateResult = async () => {
    setLoading(true);
    if (number1 === '' || number2 === '' || selectedOperation === '') {
      notification(
        (type = 'warning'),
        (title = 'Empty Field!'),
        (textBody = 'Please write something to upload!'),
        1000,
      );
      setLoading(false);
      return;
    }

    if (isNaN(number1) || isNaN(number2)) {
      notification(
        (type = 'warning'),
        (title = 'Invalid Input!'),
        (textBody = 'Please enter valid numbers!'),
        1000,
      );
      setLoading(false);
      return;
    }

    try {
      const response = await calculateData({
        num1: number1,
        num2: number2,
        operation: selectedOperation.toLowerCase(),
      });

      setResult(response.data);

      console.log('result', response.data);
    } catch (error) {
      console.error('Error calculating result:', error);
      notification(
        (type = 'error'),
        (title = 'Error!'),
        (textBody = 'An error occurred while calculating the result.'),
        1000,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Text style={styles.notificationText}>
          Enter the values to calculate the result
        </Text>

        <View style={styles.body}>
          <TextField
            value={number1}
            onChange={text => setNumber1(text)}
            label={'Enter number 1'}
            keyboardType="numeric"
          />
          <TextField
            value={number2}
            onChange={text => setNumber2(text)}
            label={'Enter number 2'}
            keyboardType="numeric"
          />
          <Dropdown
            operations={operations}
            setSelectedOperation={setSelectedOperation}
          />
        </View>

        {result !== '' && (
          <Text style={styles.result}>
            The result of the operation is: {result.result}
          </Text>
        )}

        <BasicButton
          text={'Calculate Result'}
          onPress={calculateResult}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: dimensions.Width * 0.05,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: fonts.size.font15,
    fontFamily: 'Urbanist-Bold',
  },
  notificationText: {
    fontSize: fonts.size.font16,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
    marginBottom: dimensions.Height * 0.02,
    paddingHorizontal: dimensions.Width * 0.08,
  },
  result: {
    fontSize: fonts.size.font16,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
    marginTop: dimensions.Height * 0.03,
  },
});

export default Calculator;
