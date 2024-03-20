import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import colors from '../../utils/colors';
import dimensions from '../../utils/dimensions';
import fonts from '../../utils/fonts';

import Icon from 'react-native-vector-icons/Entypo';

const Dropdown = ({operations, setSelectedOperation}) => {
  return (
    <SelectDropdown
      data={operations}
      onSelect={selectedItem => {
        setSelectedOperation(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      buttonStyle={{
        width: dimensions.Width * 0.9,
        height: dimensions.Height * 0.06,
        backgroundColor: colors.backgroundLight,
        borderRadius: 8,
        borderWidth: 0.3,
        borderColor: colors.gray,
        paddingHorizontal: dimensions.Width * 0.05,
      }}
      buttonTextStyle={{
        fontFamily: 'Urbanist-Regular',
        fontSize: fonts.size.font15,
        textAlign: 'left',
      }}
      rowTextStyle={{
        fontFamily: 'Urbanist-Regular',
        fontSize: fonts.size.font15,
        textAlign: 'left',
      }}
      renderDropdownIcon={() => {
        return <Icon name="chevron-down" size={24} color={colors.gray} />;
      }}
    />
  );
};

export default Dropdown;
