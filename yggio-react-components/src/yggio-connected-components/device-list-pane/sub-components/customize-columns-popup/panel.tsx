import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {
  MdKeyboardArrowUp as UpIcon,
  MdKeyboardArrowDown as DownIcon,
  MdClose as RemoveIcon,
  MdCheckCircle as CheckIcon,
  MdDelete as DeleteIcon,
} from 'react-icons/md';
import {useTranslation} from 'react-i18next';
import {
  Flex,
  Button as ChakraButton,
} from '@chakra-ui/react';

// Logic
import {COLUMNS, COLUMN_PRESETS} from '../../constants';
import {VIEW_TYPES, COLORS} from '../../../../constants';
import {
  moveItemUpInArray,
  moveItemDownInArray,
  addColumnOptions,
  presetOptions,
} from '../../utils';

// UI
import TooltipAnchor from '../../../../components/tooltip-anchor';
import {
  CustomizeColumnsMainSection,
  CustomizeColumnsItem,
  CustomizeColumnsItemButton,
  CustomizeColumnsFooter,
} from '../../styled';
import {viewApi} from '../../../../api';
import ColumnTooltipText from './tooltip';
import Select from '../../../../components/select';

import type {Column} from '../../constants';
import type {ViewColumn} from '../../../../types';

interface PanelProps {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

const Panel = (props: PanelProps) => {
  const queryClient = useQueryClient();
  const viewQuery = viewApi.useViewsQuery<ViewColumn[]>({type: VIEW_TYPES.column});
  const {t} = useTranslation();
  const [selectedColumn, setSelectedColumn] = React.useState<Column>(COLUMNS.name);
  const deleteViewMutation = viewApi.useViewDeletionMutation(queryClient);

  const createColumns = () => {
    const viewsDataNames = _.map(viewQuery.data, 'name');
    return _.difference([..._.values(COLUMNS), ...viewsDataNames], props.columns);
  };

  const deleteColumn = async () => {
    const viewId = _.find(viewQuery.data, {name: selectedColumn})?._id;
    if (viewId) {
      try {
        await deleteViewMutation.mutateAsync({_id: viewId});
        return toast.success(t('phrases.columnDeleted'));
      } catch (err) {
        if (err instanceof Error) {
          return toast.error(err.message);
        }
      }
    }
    toast.error('Cannot delete default column');
  };

  return (
    <>
      <CustomizeColumnsMainSection>
        {_.map(props.columns, (column, index) => (
          <CustomizeColumnsItem key={column} disabled={column === COLUMNS.name}>
            <p>{t(`columns.${column}`, {defaultValue: _.capitalize(column)})}</p>
            {column !== COLUMNS.name && (
              <Flex align='center'>
                {_.find(viewQuery.data, view => column === view.name) && (
                  <TooltipAnchor
                    tooltipPlacement='bottom'
                    text={<ColumnTooltipText columnData={viewQuery.data} column={column} />}
                    id={column}
                    margin={'0 30px 0 0'}
                  />
                )}
                <CustomizeColumnsItemButton
                  disabled={index === 1}
                  onClick={() => props.setColumns(moveItemUpInArray(props.columns, index))}
                >
                  <UpIcon size={18} />
                </CustomizeColumnsItemButton>
                <CustomizeColumnsItemButton
                  disabled={index === props.columns.length - 1}
                  onClick={() => props.setColumns(moveItemDownInArray(props.columns, index))}
                  margin={'0 30px 0 0'}
                >
                  <DownIcon size={18} />
                </CustomizeColumnsItemButton>
                <CustomizeColumnsItemButton
                  onClick={() => (
                    props.setColumns(_.without(props.columns, column))
                  )}
                >
                  <RemoveIcon size={14} />
                </CustomizeColumnsItemButton>
              </Flex>
            )}
          </CustomizeColumnsItem>
        ))}
      </CustomizeColumnsMainSection>
      <CustomizeColumnsFooter>
        <Flex align='center'>
          <Select
            isClearable
            width='300px'
            placeholder={_.capitalize(t(`labels.columns`))}
            options={addColumnOptions(createColumns(), t)}
            margin='10px'
            onChange={evt => {
              const value = evt.target.value as Column;
              setSelectedColumn(value);
            }}
            menuPlacement='top'
          />
          <ChakraButton
            title={t('labels.addColumn')}
            onClick={() => {
              props.setColumns([...props.columns, selectedColumn]);
            }}
            bg='transparent'
            color={COLORS.green}
            m='2px'
            p='0'
            w='30px'
            minW='30px'
            _hover={{color: COLORS.greenLight}}
          >
            <CheckIcon size={24} />
          </ChakraButton>
          <ChakraButton
            title={t('labels.deleteColumn')}
            onClick={deleteColumn}
            bg='transparent'
            color={COLORS.redDark}
            m='2px'
            p='0'
            w='30px'
            minW='30px'
            _hover={{color: COLORS.red}}
          >
            <DeleteIcon size={24} />
          </ChakraButton>
        </Flex>
        <Select
          width='300px'
          placeholder={t(`labels.selectPreset`)}
          options={presetOptions}
          margin='10px'
          onChange={evt => {
            const value = evt.target.value as keyof typeof COLUMN_PRESETS;
            props.setColumns(COLUMN_PRESETS[value].columns);
          }}
          menuPlacement='top'
        />
      </CustomizeColumnsFooter>
    </>
  );
};

export default Panel;
