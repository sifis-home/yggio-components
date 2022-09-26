/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';
import {Icon} from 'react-icons-kit';
import {check as checkIcon} from 'react-icons-kit/fa/check';
import {spinner as spinnerIcon} from 'react-icons-kit/fa/spinner';
import {upload as uploadIcon} from 'react-icons-kit/fa/upload';
import _ from 'lodash';
import {withYggio} from '../../../yggio-context';
import {withEvents, withReselect, withState} from '../../../hocs';
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import {FlexWrapper, CenterContentContainer} from '../../../global/styled';
import {
  InputWrapper,
  UploadFileButtonStyled,
  InputPrepender,
  SpinningIcon,
} from './styled';
import ContainerBox from '../../../components/container-box';
import {getFormShape} from '../../../utils/form-wizard';
import selectors from './selectors';
import events from './events';
import Select from '../../../components/select';
import state from './state';

const LayerEditor = (props) => {
  React.useEffect(() => {
    props.getLocation(props.locationId);
  }, []);

  React.useEffect(() => {
    props.getImages({nameSpace: 'blueprints'});
  }, []);

  React.useEffect(() => {
    if (props.layer) {
      props.setInputValue('name', _.get(props, 'layer.name'));
    }
  }, [props.layer]);

  return (
    <CenterContentContainer>
      <ContainerBox
        position={'relative'}
        display={'flex'}
        width={'30%'}
        height={'100%'}
        flexDirection={'column'}
        margin={'10px'}
        includeMarginInHeight
        includeMarginInWidth
      >
        <InputWrapper>
          <InputWrapper>
            <TextField
              placeholder={'e.g Street 101'}
              label={'Name'}
              name={'name'}
              valid={_.get(props.formInputs, 'name.validation.isValid')}
              value={_.get(props.formInputs, 'name.value', '')}
              onChange={props.handleValueChange}
            />
            <InputPrepender
              isValid={_.get(props.formInputs, 'name.validation.isValid')}
            >
              <Icon icon={checkIcon} size={20}/>
            </InputPrepender>
          </InputWrapper>
          <InputWrapper>
            <FlexWrapper>
              <Select
                name={'image'}
                value={_.get(props.formInputs, 'image.value')}
                options={props.layerImages}
                onFocus={() => props.getImages('blueprints')}
                onChange={props.handleValueChange}
              />
              <UploadFileButtonStyled>
                <input
                  type="file"
                  onChange={evt => {
                    const [file] = evt.target.files;
                    props.uploadImage({file, nameSpace: 'blueprints'});
                  }}
                />
                {!props.isUploading
                  ? <Icon size={25} icon={uploadIcon}/>
                  : <SpinningIcon size={25} icon={spinnerIcon}/>
                }
              </UploadFileButtonStyled>
            </FlexWrapper>
          </InputWrapper>

          <FlexWrapper style={{justifyContent: 'space-between'}}>
            <Button
              margin={'5px'}
              content={'Cancel'}
              onClick={() => props.router.push(`/locations/${props.locationId}/${props.layerId}`)}
            />
            <Button
              margin={'5px'}
              color={'green'}
              content={'Save'}
              onClick={props.handleLayerEdit}
            />
          </FlexWrapper>
        </InputWrapper>
      </ContainerBox>
    </CenterContentContainer>
  )
};

LayerEditor.propTypes = {
  layer: PropTypes.object,
  setLayerData: PropTypes.func,
  resetLayerData: PropTypes.func,
  // from form state
  ...getFormShape({
    name: PropTypes.string,
  }),
};

const yggio = {
  mapYggioStateToProps: yggioState => ({
    locations: yggioState.apiState.locations.fetch,
    images: yggioState.database.images,
    location: yggioState.apiState.locations.get,
  }),
  mapYggioActionsToProps: yggioActions => ({
    getImages: yggioActions.database.images.getImages,
    uploadImage: yggioActions.database.images.uploadImage,
    createLocation: yggioActions.apiState.locations.create,
    updateLocation: yggioActions.apiState.locations.update,
    getLocation: yggioActions.apiState.locations.get,
  }),
};

export default compose(
  withYggio(yggio),
  withState(state),
  withReselect(selectors),
  withEvents(events),
)(LayerEditor)
