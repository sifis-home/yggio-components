import styled from 'styled-components';
import {eq} from 'lodash/fp';
import {COLORS} from '../../constants';
import {FlexMaxWidthWrapper} from '../../global/styled';

const ImagePreviewContainer = styled.div`
  transition: 0.5s;
  z-index: 99999;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${COLORS.greyTransparent};
  opacity: ${({state}) => (eq(state, 'entered') ? 1 : 0)};
`;

const ImagePreview = styled.img`
  z-index: 999999;
  max-width: 90%;
  max-height: 90%;
  background: ${COLORS.grey};
  border: 2px solid ${COLORS.grey};
  border-radius: 5px;
`;

const ImagePreviewCloser = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.greyLight};
  z-index: 100;
  font-size: 1.7em;
  font-weight: 600;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 20px;
  transition: all 0.3s;

  &:hover {
    transition: all 0.3s;
    color: ${COLORS.white};
  }
`;

const ImagePreviewMetaData = styled(FlexMaxWidthWrapper)`
  position: absolute;
  justify-content: space-around;
  top: 0;
  height: 50px;
`;

export {
  ImagePreviewContainer,
  ImagePreview,
  ImagePreviewCloser,
  ImagePreviewMetaData,
};
