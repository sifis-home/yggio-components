// styled.js

import styled from 'styled-components';

const DevicesListContainer = styled.div`
  width: 100%;
  background: 'blue';
  h1 {
    font-size: 18px;
    margin: 0 0 20px 0;
  }
`;

const DeviceTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3px;
  font-size: 14px;
`;

const TableCell = styled.div`
  background: #f2f2f2;
  margin-bottom: 2px;
  padding: 8px 0 8px 8px;
`;

const HeadingCell = styled.div`
  background: #e2e2e2;
  margin-bottom: 2px;
  padding: 8px 0 8px 8px;
  font-weight: bold;
`;

export {
  DevicesListContainer,
  DeviceTable,
  TableCell,
  HeadingCell,
};
