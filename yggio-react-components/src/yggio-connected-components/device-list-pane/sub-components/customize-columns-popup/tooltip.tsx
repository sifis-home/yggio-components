import React from 'react';
import _ from 'lodash';
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

// Logic
import {
  COLUMN_THRESHOLDS_LABELS,
} from '../../constants';// UI
import type {ViewColumn} from '../../../../types';

interface ColumnTooltipTextProps {
  column: string;
  columnData?: ViewColumn[];
}

const ColumnTooltipText = ({
  column,
  columnData
}: ColumnTooltipTextProps) => {
  const currentColumn = _.find(columnData, view => column === view.name);
  return (
    <Flex flexDir='column'>
      <Text fontSize='sm' fontWeight='bold'>
        Property: {currentColumn?.data.property}
      </Text>
      {!_.isEmpty(currentColumn?.data.threshold) && (
        <TableContainer color='white'>
          <Table size='sm' variant='simple' >
            <Thead>
              <Tr>
                <Th>Comparison</Th>
                <Th>Value</Th>
                <Th>Color</Th>
              </Tr>
            </Thead>
            <Tbody>
              {_.map(currentColumn?.data.threshold, (columnThreshold, key) => (
                <Tr h='10px' key={key}>
                  <Td>{COLUMN_THRESHOLDS_LABELS[columnThreshold.comparison]}</Td>
                  <Td>{columnThreshold.value}</Td>
                  <Td color={columnThreshold.color}>{columnThreshold.color}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default ColumnTooltipText;
