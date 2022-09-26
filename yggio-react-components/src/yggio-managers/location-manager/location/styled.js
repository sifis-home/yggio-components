/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS, IMAGES} from '../../../constants';
import {getScreenCoordinate} from './utils';
import {FlexColWrapper, FlexMaxWidthWrapper} from '../../../global/styled';

const LayerContainer = styled.div`
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
`;

const LayerSpriteStyled = styled.img.attrs(props => {
  // use attrs for better efficiency w/ many changes
  // warnings were going off about changing styled
  // properties too often, and suggested this as a solution
  const coordinate = {
    x: -props.width / 2,
    y: -props.height / 2,
  };
  const screenCoordinate = getScreenCoordinate(
    coordinate,
    props.geometry,
    props.parentDimensions,
  );
  const width = `${(props.width * props.geometry.scale)}px`;
  const height = `${(props.height * props.geometry.scale)}px`;
  const style = {
    left: `${screenCoordinate.x}px`,
    top: `${screenCoordinate.y}px`,
    width,
    height,
  };
  return {style};
})`
  position: absolute;
  pointer-events: none;
  user-select: none;
`;

const DeviceItemWrapperStyled = styled.div.attrs(props => {
  const coordinate = {
    x: props.deviceItem.left,
    y: props.deviceItem.top,
  };
  const screenCoordinate = getScreenCoordinate(
    coordinate,
    props.geometry,
    props.parentDimensions,
  );
  const style = {
    left: `${(screenCoordinate.x - 0.5 * props.width)}px`,
    top: `${(screenCoordinate.y - 0.5 * props.height)}px`,
  };
  return {style};
})`
  position: absolute;
  z-index: 1;
`;


const StyledDevicePopup = styled.div.attrs(props => {
  // use attrs for better efficiency w/ many changes
  // warnings were going off about changing styled
  // properties too often, and suggested this as a solution
  const width = 300;
  const coordinate = {
    x: props.deviceItem.left,
    y: props.deviceItem.top,
  };
  const screenCoordinate = getScreenCoordinate(
    coordinate,
    props.geometry,
    props.parentDimensions,
  );
  const style = {
    left: `${screenCoordinate.x + 7}px`,
    top: `${screenCoordinate.y + 15}px`,
    width: `${width}px`,
    overflowY: 'auto'
  };
  return {style};
})`
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: absolute;
  user-select: none;
  border: 1px solid lightgray;
  border-radius: 0 8px 8px 8px;
  background-color: ${COLORS.white};
  padding: 20px;
  word-wrap: break-word;
  max-height: 400px;
  .checked_eye {
    color: ${COLORS.greenDark};
    cursor: pointer;
    padding-bottom: 3px;
  }
  .unchecked_eye {
    color: #999;
    cursor: pointer;
    padding-bottom: 3px;
  }
  .chartIcon {
    margin-right: 7px;
  }
  .notTranslated {
    color: #999;
  }
`;


const StyledDevicePopupDeviceList = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  white-space: nowrap;
`;

const StyledDevicePopupDeviceListItem = styled.div`
  display: flex;
  height: 35px;
  line-height: 35px;
  &:nth-child(odd) {
    background: ${COLORS.greyLight};
  }
`;

const StyledDevicePopupDeviceItemName = styled.div`
  flex: 1 0 100px;
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDevicePopupDeviceItemValue = styled.div`
  flex: 1 0 30px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledDevicePopupDeviceItemIcon = styled.div`
  flex: 0 0 30px;
  text-align: right;
  padding-right: 5px;
`;

const DeviceItemSpriteStyled = styled.div.attrs(props => {
  // use attrs for better efficiency w/ many changes
  // warnings were going off about changing styled
  // properties too often, and suggested this as a solution
  const style = {
    width: `${props.width}px`,
    height: `${props.height}px`,
  };
  return {style};
})`
  position: absolute;
  user-select: none;
  border: 2px solid ${COLORS.greyDark};
  border-radius: 50%;
  background-image: url(${props => {
  return _.get(props, 'deviceItem.locationItemControl.icon') || IMAGES.defaultDeviceIcon
}});
  z-index: 2;
  background-color: ${COLORS.marker};
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-color 0.2s;
  cursor: ${props => {
  if (props.isGrabbed) return 'grabbing';
  if (props.isMovable) return 'grab';
  return 'pointer';
}};

  &:hover {
    background-color: ${COLORS.markerHover};
    transition: background-color 0.2s;
  }
`;

const ValueDisplay = styled.div`
  position: absolute;
  top: 3px;
  left: 12px;
  height: 28px;
  line-height: 28px;
  padding: 0 10px 0 24px;
  z-index: 0;
  border-radius: 14px;
  background: #333;
  color: white;
  white-space: nowrap;
  pointer-events: none;
  font-size: 14px;
`;

const StyledCloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 2px;
  font-size: 1.1em;
  color: ${COLORS.greyDark};

  &:hover {
    color: ${COLORS.greenDark};
  }
`;

const StyledDeviceValues = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledViewAllButton = styled.div`
  font-weight: 800;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 5px;
  transition: color 0.2s;
  color: ${COLORS.greenDark};

  &:hover {
    color: ${COLORS.greenLight};
    transition: color 0.2s;
  }
`;

const ControlWrapper = styled(FlexColWrapper)`
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  position: absolute;
  left: 25px;
  top: 25px;
  width: 50px;
  height: 200px;
  padding: 20px 5px;
`;

const RemovalZoneContainer = styled(FlexMaxWidthWrapper)`
  justify-content: center;
  align-items: center;
  color: ${COLORS.black};
  font-size: 2em;
  font-weight: 800;
  z-index: 1;
  position: absolute;
  height: 25vh;
  bottom: 0;
  left: 0;
  background: rgba(50, 50, 50, 0.3);
  transition: all 0.3s;

  &:hover {
    background: ${(props) => !!props.movingDeviceItem
      ? 'rgba(70, 70, 70, 0.8)'
      : 'rgba(50, 50, 50, 0.4)'
    };
    transition: all 0.3s;
  }
`;

const SpinnerWrapper = styled(FlexMaxWidthWrapper)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledTableItem = styled.div`
  cursor: ${({cursor}) => cursor || 'default'};
`;

const StyledTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  background: ${({background}) => background || COLORS.white};
  color: ${({color}) => color || COLORS.black};
  border-bottom: 2px solid ${COLORS.grey};
  height: 40px;
`;

const StyledTableRowDropdown = styled.section`
  transition: all 0.2s;
  height: ${({open}) => open ? '50px' : '0'};
  opacity: ${({open}) => open ? '1' : '0'};
  visibility: ${({open}) => open ? 'visible' : 'hidden'};
`;

const StyledDeviceRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${COLORS.trueWhite};
  font-size: 0.8em;
  margin: 5px;
  box-sizing: border-box;
  padding: 2px 10px 2px;
  height: 40px;
  border-bottom: 1px solid ${COLORS.greyDark};
`;

const StyledIconLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid ${COLORS.black};
  transition: background 0.2s;
  background: ${COLORS.white};
  
  &:hover {
    transition: background 0.2s;
    background: ${COLORS.greyLight};
  }
`;

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: black;
    text-decoration: underline;
  }
`;

const BackButtonText = styled.p`
  margin: 0 0 0 3px;
  position: relative;
  top: 2px;
`;

export {
  LayerContainer,
  LayerSpriteStyled,
  DeviceItemWrapperStyled,
  StyledCloseButton,
  StyledDevicePopup,
  StyledDevicePopupDeviceItemIcon,
  StyledDevicePopupDeviceItemName,
  StyledDevicePopupDeviceItemValue,
  StyledDevicePopupDeviceList,
  StyledDevicePopupDeviceListItem,
  StyledDeviceValues,
  StyledViewAllButton,
  DeviceItemSpriteStyled,
  ValueDisplay,
  ControlWrapper,
  RemovalZoneContainer,
  SpinnerWrapper,

  // Table
  StyledTableItem,
  StyledTableRow,
  StyledTableRowDropdown,
  StyledDeviceRow,
  StyledIconLink,

  BackButtonWrapper,
  BackButtonText,
}
