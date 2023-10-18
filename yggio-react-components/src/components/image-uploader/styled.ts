import styled from 'styled-components';
import {COLORS} from '../../constants';

const ImageDropZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.greyLightAlt};
  color: ${COLORS.greyMedium};
  border: 1px solid ${COLORS.greenRacing};
  border-radius: 5px;
  width: 220px;
  height: 100px;
  transition: background 0.2s;

  &:hover {
    background: ${COLORS.greyLight};
    transition: background 0.2s;
  }
`;

export {
  ImageDropZone,
};
