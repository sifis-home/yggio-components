/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// Modules
import styled from 'styled-components';
import {eq} from 'lodash/fp';
import dynamic from 'next/dynamic';

// Local components
import {COLORS} from '../../constants';

const Map = dynamic(
  () => import('react-leaflet').then(mod => mod.Map),
  {ssr: false},
);

const Tooltip = dynamic(
  () => import('react-leaflet').then(mod => mod.Tooltip),
  {ssr: false},
);

const MapWrapper = styled.div`
  position: relative;
  height: ${({height}) => height || '100vh'};
  width: ${({width}) => width || '100%'};
`;

const LeafletMap = styled(Map)`
  filter: ${props => (props.placementMode ? 'grayscale(50%)' : 'none')};

  & {
    height: 100%;
    width: 100%;
  }


  & .leaflet-popup-content {
    margin: 0;
    padding: 0;
    width: 199px;
  }
  & .leaflet-popup-content-wrapper {
    margin: 0;
    padding: 0;
  }

  & .leaflet-marker-icon {
    div {
      filter: brightness(100%);
      transition: all 0.2s;
    }
    div:hover {
      filter: brightness(120%);
      transition: all 0.2s;
    }
  }

  & .leaflet-div-icon {
    background: none;
    border: none;
  }
`;

const BaseTooltip = styled(Tooltip)`

  &::before {
    border: none;
  }
`;

const MapButtonsLayer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  min-height: 200px;
`;

const MapItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  flex-direction: column;
  height:150px;
  width: 200px;
  margin: 0;
  padding: 0;
`;

const MapItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  background: ${COLORS.white};
  height: 20%;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid ${COLORS.greyLight};
`;

const MapItemFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: ${COLORS.white};
  height: 80%;
  width: 100%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;


const MovingModeLayer = styled.div`
  z-index: 1000;
  position: absolute;
  display: flex;
  justify-content: center;
  color: ${COLORS.greyDark};
  background: rgba(20, 20, 20, 0.2);
  padding-top: 50px;
  width: 100%;
  font-size: 2em;
  font-weight: 800;
`;

const MarkerClusterIcon = styled.div`
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({color}) => color};
  border: 2px solid ${COLORS.white};
  border-radius: ${({shape}) => shape === 'round' ? '50px' : '1px'};
  width: 30px;
  height: 30px;
  padding: 4px;
  transition: all 0.2s;
  background-size: 80%;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
  }
`;

const MarkerIcon = styled.div`
  background: ${({color}) => color};
  border-radius: ${({markerShape}) => {
    if (eq(markerShape, 'square')) {
      return '3px';
    }

    if (eq(markerShape, 'round')) {
      return '50px';
    }

    return '5px';
  }};
  width: 100%;
  height: 100%;
  padding: 4px;
  border: 2px solid ${COLORS.greyDark};
  transition: background 0.2s;
  background-size: 80%;

  img {
    height: 100%;
    width: 100%;
  }
`;

const StyledMessageBox = styled.div`
  z-index: 1000;
  position: absolute;
  top: 40px;
  margin: auto;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 300px;
  background: ${COLORS.white};
  border-radius: 3px;
  border: 2px solid ${COLORS.greenRacing};
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.75);
`;

export {
  MapWrapper,
  LeafletMap,
  BaseTooltip,
  MapButtonsLayer,
  MapItem,
  MapItemHeader,
  MapItemFooter,
  MovingModeLayer,
  MarkerClusterIcon,
  MarkerIcon,
  StyledMessageBox,
};
