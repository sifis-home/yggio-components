/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {compose} from 'lodash/fp';
import {withState} from '../../hocs';
import {InteractiveLayerContainer} from './styled';
import state from './state';

const InteractiveLayer = props => {
  useEffect(() => {
    if (props.position && props.prevPosition) {
      const x = props.position.left - props.prevPosition.left;
      const y = props.position.top - props.prevPosition.top;
      if (x || y) {
        props.onPan({x, y, ...props.position});
      }
    }
  }, [props.position]);

  const deriveEventPosition = evt => {
    const clientPosition = {
      left: _.get(evt, 'targetTouches[0].pageX', evt.clientX),
      top: _.get(evt, 'targetTouches[0].pageY', evt.clientY),
    };

    if (!props.boundingRect) {
      return clientPosition;
    }

    const translatedPosition = {
      left: clientPosition.left - props.boundingRect.left,
      top: clientPosition.top - props.boundingRect.top,
    };

    return {
      left: translatedPosition.left - 0.5 * props.boundingRect.width,
      top: translatedPosition.top - 0.5 * props.boundingRect.height,
    };
  };

  const handleMouseMove = evt => {
    if (props.position) {
      const derivedPosition = deriveEventPosition(evt);
      props.setPrevPosition(props.position);
      props.setPosition(derivedPosition);
    }
  };

  const handleMouseUp = () => {
    props.setPrevPosition(props.position);
    props.setPosition(null);
    props.onMouseUp();
  };

  const handleMouseDown = () => {
    props.setPosition({});
  };

  const handleWheel = evt => {
    const derivedPosition = deriveEventPosition(evt);
    const zoom = evt.deltaY;
    props.onZoom({...derivedPosition, zoom});
  };

  return (
    <InteractiveLayerContainer
      onTouchStart={handleMouseDown}
      onMouseDown={handleMouseDown}
      onTouchMove={handleMouseMove}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      position={props.position}
    >
      {props.children}
    </InteractiveLayerContainer>
  );
};

InteractiveLayer.propsTypes = {
  style: PropTypes.object, // propagate optional styling
  boundingRect: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
  onMouseUp: PropTypes.func.isRequired,
  onPan: PropTypes.func.isRequired,
  onZoom: PropTypes.func.isRequired,
};

export default compose(
  withState(state),
)(InteractiveLayer);
