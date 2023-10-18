import React from 'react';
import _ from 'lodash';
import {MdKeyboardArrowDown as DownIcon} from 'react-icons/md';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  forwardRef,
} from '@chakra-ui/react';

import {InputOptions} from '../../../types';
import {Pill} from '../styled';

interface DropdownButtonProps {
  options: InputOptions;
  value: string;
  onChange: (version: string) => void;
}

const DropdownButton = (props: DropdownButtonProps) => {
  const valueOption = _.find(props.options, {value: props.value});
  const CustomButton = forwardRef((myProps, ref) => (
    <Pill {...myProps} ref={ref}>
      {valueOption?.label}
      <DownIcon size={15} />
    </Pill>
  ));
  return (
    <Menu>
      <MenuButton as={CustomButton} />
      <MenuList>
        {_.map(props.options, option => (
          <MenuItem onClick={() => {
            if (option.value !== valueOption?.value) {
              props.onChange(option.value);
            }
          }} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DropdownButton;
