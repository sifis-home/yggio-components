import React from 'react';
import {MdMenuBook as DocsIcon} from 'react-icons/md';

import {getExternalUrls} from '../../../constants';
import {DROPDOWN_NAMES} from '../constants';
import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownButton,
} from '../styled';

import type {DropdownName} from '../types';

interface DocsWidgetProps {
  openedDropdown: DropdownName | undefined;
  setOpenedDropdown: (name?: DropdownName) => void;
}

const DocsWidget = (props: DocsWidgetProps) => {
  const isOpen = props.openedDropdown === DROPDOWN_NAMES.docs;
  return (
    <NavButtonWithDropdown>
      <NavButton
        onClick={() => (
          isOpen
            ? props.setOpenedDropdown()
            : props.setOpenedDropdown(DROPDOWN_NAMES.docs)
        )}
        isActive={isOpen}
      >
        <DocsIcon size={17} />
      </NavButton>
      {isOpen && (
        <Dropdown>
          <DropdownButton onClick={() => window.open(getExternalUrls().docs, '_blank')}>
            Yggio Docs
          </DropdownButton>
          <DropdownButton onClick={() => window.open(getExternalUrls().swagger, '_blank')}>
            Yggio Swagger
          </DropdownButton>
          <DropdownButton onClick={() => window.open(getExternalUrls().webshop, '_blank')}>
            Sensative Webshop
          </DropdownButton>
        </Dropdown>
      )}
    </NavButtonWithDropdown>
  );
};

export default DocsWidget;
