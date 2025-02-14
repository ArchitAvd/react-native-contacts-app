import React, { useState, useRef, useCallback } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

import CustomTextInput from '../components/TextInput';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  mobilePhone: Yup.string().required('Mobile Phone is required'),
  homePhone: Yup.string(),
  city: Yup.string().required('City is required'),
  birthday: Yup.date().required('Birthday is required'),
});

const fields = [
  { label: 'First Name', stateKey: 'firstName' },
  { label: 'Last Name', stateKey: 'lastName' },
  { label: 'Email', stateKey: 'email', keyboardType: 'email-address' },
  { label: 'Mobile Phone', stateKey: 'mobilePhone' },
  { label: 'Home Phone', stateKey: 'homePhone' },
  { label: 'Address', stateKey: 'city' },
  { label: 'Birthday', stateKey: 'birthday' },
];

const NewContact = () => {
  const [formData, setFormData] = useState({});
  const inputRefs = useRef({});
  const [errors, setErrors] = useState({});

  const onInputChange = useCallback(
    (text, stateKey) => {
      setFormData((prevData) => ({
        ...prevData,
        [stateKey]: text,
      }));
      if (errors[stateKey]) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[stateKey];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (index, override) => {
    const isValid = await validate();
    if (!isValid) return;
    if (index === fields.length - 1 || override) {
      try {
        const storedContacts = await AsyncStorage.getItem('contacts');
        const contacts = storedContacts ? JSON.parse(storedContacts) : [];
        contacts.push(formData);
        await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
        Alert.alert('Success', 'Contact saved successfully');
      } catch (error) {
        console.error('Error saving contact data:', error);
        Alert.alert('Error', 'There was an issue saving the contact data.');
      }
    } else {
      const nextField = fields[index + 1];
      if (inputRefs.current[nextField.stateKey]) {
        inputRefs.current[nextField.stateKey].focus();
      }
    }
  };

  return (
    <KeyboardAwareScrollView style={{ backgroundColor: colors.background }}>
      {fields.map((field, index) => (
        <View key={field.stateKey}>
          <CustomTextInput
            key={field.stateKey}
            ref={(input) => (inputRefs.current[field.stateKey] = input)}
            value={formData[field.stateKey]}
            onChangeText={(text) => onInputChange(text, field.stateKey)}
            returnKeyType={index === fields.length - 1 ? 'done' : 'next'}
            onSubmitEditing={() => handleSubmit(index)}
            {...field}
          />
        </View>
      ))}
      <View style={{ marginTop: 20 }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            style={{ width: '50%' }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default NewContact;
