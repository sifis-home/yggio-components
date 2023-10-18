// styled
import styled from 'styled-components';

const TitleContainer = styled.div`
  font-family: Lato, Arial, sans-serif;
  display: grid;
  grid-template-columns: 126px 126px 126px;
  font-size: 13px;
  margin-left: 5px;
`;

const TableTitle = styled.div`
  margin: 0 0 5px 0;
`;

const ColonContainer = styled.div`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 25px;
`;

const TimeIntervalContainer = styled.div`
  display: flex;
`;

export {
  TitleContainer,
  TableTitle,
  ColonContainer,
  TimeIntervalContainer,
};
