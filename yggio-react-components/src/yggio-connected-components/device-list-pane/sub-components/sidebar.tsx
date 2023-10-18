import React from 'react';
import _ from 'lodash';
import {
  MdOutlineFilterAlt as FilterIcon,
  MdKeyboardArrowUp as CollapseIcon,
  MdKeyboardArrowDown as ExpandIcon,
} from 'react-icons/md';
import {useTranslation} from 'react-i18next';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import Select from '../../../components/select';
import Collapsible from '../../../components/collapsible';
import {
  DEVICE_TYPES,
  FILTERING_TYPES,
  SIDEBAR_SIBLING_WIDTH,
} from '../constants';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import {Sidebar as SidebarContainer} from '../../../components/sidebar-components';
import {
  SidebarHeading,
  SidebarHeadingLeftSection,
  SidebarHeadingTitle,
  CollapsableButton,
  CollapsableButtonIconWrapper,
  InfoModal,
  KeyValueWrapper,
} from '../styled';
import {devicesApi} from '../../../api';

import type {ListStateProps} from '../types';
import type {Form} from '../../../types';

interface SidebarProps {
  listState: ListStateProps;
  filterForm: Form;
  isFiltering: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const Sidebar = (props: SidebarProps) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {t} = useTranslation();

  const connectorDevicesQuery = devicesApi.useDevicesQuery({
    params: {filter: {attributeExists: 'downlinkQueue'}},
    enabled: props.listState.filterCollapsed?.[FILTERING_TYPES.connector],
  });

  const handleValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    props.listState.setCursorId(null);
    props.listState.setCursorDirection(null);
    const {target: {value, name}} = evt;
    props.filterForm.setInputValue(name, value);
    if (props.listState.currentPage !== 1) {
      props.listState.setCurrentPage(1);
    }
  };

  const handleContextualParamaterKeyValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(evt);
    const keyValue = evt.target.value;
    if (keyValue === '') {
      props.filterForm.setInputValue('filterContextualParameterValue', '');
    }
  };

  const availableConnectors = _.map(connectorDevicesQuery.data, device => ({
    label: device.name!,
    value: `${device.name}_${device._id}`,
  }));

  return (
    <SidebarContainer
      isSidebarOpen={props.isSidebarOpen}
      openSidebar={() => props.setIsSidebarOpen(true)}
      closeSidebar={() => props.setIsSidebarOpen(false)}
      siblingWidth={SIDEBAR_SIBLING_WIDTH}
      isUsingNavbar
    >
      <SidebarHeading>
        <SidebarHeadingLeftSection>
          <FilterIcon size={19} />
          <SidebarHeadingTitle>
            {_.capitalize(t('labels.filter'))}
          </SidebarHeadingTitle>
        </SidebarHeadingLeftSection>
        {props.isFiltering && (
          <Button
            onClick={() => {
              props.filterForm.resetForm();
              props.listState.reset();
            }}
            color={'red'}
            content={'Clear filter'}
            height={'26px'}
            width={'80px'}
            ghosted
          />
        )}
      </SidebarHeading>

      <Collapsible
        openedHeight={'110px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.name]}
        onClick={() => (
          props.listState.setFilterCollapsed(FILTERING_TYPES.name)
        )}
        label={
          <CollapseButton
            title='Name'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.name]}
          />
        }
      >
        <TextField
          name={'filterName'}
          onChange={handleValueChange}
          value={props.filterForm.formInputs.filterName.value as string}
          placeholder={`e.g. My device`}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.deviceModelName]}
        onClick={() => (
          props.listState.setFilterCollapsed(
            FILTERING_TYPES.deviceModelName,
          )
        )}
        label={
          <CollapseButton
            title='Device model name'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.deviceModelName]}
          />
        }
      >
        <TextField
          name={'filterDeviceModelName'}
          onChange={handleValueChange}
          value={props.filterForm.formInputs.filterDeviceModelName.value as string}
          placeholder={`e.g. sensative-strips-presence`}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.type]}
        onClick={() => {
          props.listState.setFilterCollapsed(FILTERING_TYPES.type);
        }}
        label={
          <CollapseButton
            title='Type'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.type]}
          />
        }
      >
        <Select
          isClearable
          width={'100%'}
          placeholder={_.capitalize(t('placeholders.select'))}
          name={'filterType'}
          options={DEVICE_TYPES}
          value={props.filterForm.formInputs.filterType.value as string}
          onChange={handleValueChange}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.devEui]}
        onClick={() => (
          props.listState.setFilterCollapsed(FILTERING_TYPES.devEui)
        )}
        label={
          <CollapseButton
            title='DevEUI'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.devEui]}
          />
        }
      >
        <TextField
          name={'filterDevEui'}
          onChange={handleValueChange}
          value={props.filterForm.formInputs.filterDevEui.value as string}
          placeholder={`e.g. 7023D5DC0101A310`}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'110px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.connector]}
        onClick={() => (
          props.listState.setFilterCollapsed(FILTERING_TYPES.connector)
        )}
        label={
          <CollapseButton
            title='Connector'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.connector]}
          />
        }
      >
        <Select
          isClearable
          width={'100%'}
          placeholder={_.capitalize(t('placeholders.select'))}
          name={'filterConnector'}
          options={availableConnectors}
          value={props.filterForm.formInputs.filterConnector.value as string}
          onChange={handleValueChange}
        />
      </Collapsible>

      <Collapsible
        openedHeight={'150px'}
        open={props.listState.filterCollapsed[FILTERING_TYPES.contextualParameter]}
        onClick={() => (
          props.listState.setFilterCollapsed(FILTERING_TYPES.contextualParameter)
        )}
        label={
          <CollapseButton
            title='Contextual parameter'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.contextualParameter]}
          />
        }
      >
        <KeyValueWrapper>
          <TextField
            name={'filterContextualParameterKey'}
            onChange={handleContextualParamaterKeyValueChange}
            value={props.filterForm.formInputs.filterContextualParameterKey.value as string}
            placeholder={`Key`}
            margin={'0 0 10px 0'}
            width={'250px'}
          />
          <TextField
            isDisabled={props.filterForm.formInputs.filterContextualParameterKey.value === ''}
            name={'filterContextualParameterValue'}
            onChange={handleValueChange}
            value={props.filterForm.formInputs.filterContextualParameterValue.value as string}
            placeholder={`Value`}
            width={'250px'}
          />
        </KeyValueWrapper>
      </Collapsible>

      <Collapsible
        open={props.listState.filterCollapsed[FILTERING_TYPES.q]}
        onClick={() => (
          props.listState.setFilterCollapsed(FILTERING_TYPES.q)
        )}
        label={
          <CollapseButton
            title='Custom query'
            isOpen={props.listState.filterCollapsed[FILTERING_TYPES.q]}
          />
        }
      >
        <Button
          onClick={() => onOpen()}
          label='info'
        />

        <TextField
          name={'filterQ'}
          onChange={handleValueChange}
          value={props.filterForm.formInputs.filterQ.value as string}
          placeholder={`e.g. secret~='YOURSECRET'`}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Custom Query</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InfoModal>
                <h1>Search for a specific string or number</h1>
                <h2>The search terms are case sensitive. Use the specific syntax for string or number:</h2>
                <h3>String: secret~='YOURSECRET'</h3>
                <h3>Number: temperature&gt;25</h3>
              </InfoModal>
              <Button onClick={() => onClose()} label="Close" />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Collapsible>
    </SidebarContainer>
  );
};

interface CollapseButtonProps {
  title: string;
  isOpen: boolean;
}

const CollapseButton = (props: CollapseButtonProps) => (
  <CollapsableButton>
    {props.title}
    <CollapsableButtonIconWrapper>
      {
        props.isOpen
          ? <CollapseIcon size={20} />
          : <ExpandIcon size={20} />
      }
    </CollapsableButtonIconWrapper>
  </CollapsableButton>
);

export default Sidebar;
