/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

import {withState} from '../../../../../hocs';
import {withYggio} from '../../../../../yggio-context';

import {
  generateForm,
  getFormValues,
  inputValidators,
  getValidationErrorMessage,
  getFormShape,
  isFormValid,
  generateHandleValueChange,
  generateShowInputValidation,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';

import ContainerBox from '../../../../../components/container-box';
import TextField from '../../../../../components/text-field';
import Button from '../../../../../components/button';

import {
  Heading,
  ButtonsContainer,
} from './styled';


// /////
// The BasicCreateMemberPane - uses only fully processed data
// /////

const BasicCreateOrganizationPane = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);

  const createOrganization = async () => {
    if (isFormValid(props.formInputs)) {
      const template = getFormValues(props.formInputs);
      try {
        await props.createOrganization({
          template,
        });
        props.router.push('/organizations');
      } catch (err) {
        // do nothing?
        // console.log('createOrganization err', {err});
      }
    }
  };

  return (
    <ContainerBox margin="20px">
      <Heading>Create organization</Heading>
      <TextField
        label="Name"
        name="name"
        onChange={onChange}
        onBlur={onBlur}
        value={props.formInputs.name.value}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.name)}
        margin="0 0 10px 0"
      />
      <TextField
        label="Description"
        name="description"
        onChange={onChange}
        value={props.formInputs.description.value}
        isOptional
      />
      <ButtonsContainer>
        <Button
          onClick={createOrganization}
          content={'Create'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={() => props.router.push('/organizations')}
        />
      </ButtonsContainer>
    </ContainerBox>
  );
};

BasicCreateOrganizationPane.propTypes = {
  router: PropTypes.object.isRequired,
  // from form state
  ...getFormShape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  // from yggio
  createOrganization: PropTypes.func.isRequired,
};


// ////
// RawCreateOrganizationPane - full data processing
// ////

const formConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a name'),
      ],
    },
  },
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const formState = generateForm(formConfig);

const RawCreateOrganizationPane = compose(
  withState(formState),
)(BasicCreateOrganizationPane);

RawCreateOrganizationPane.propTypes = {
  router: PropTypes.object.isRequired,
  // from yggio
  createOrganization: PropTypes.func.isRequired,
};


// /////
// CreateOrganizationPane - fully yggio connected
// /////

// and yggio
const yggio = {
  mapYggioActionsToProps: yggioActions => ({
    createOrganization: yggioActions.database.organizations.createOrganization,
  }),
};

const CreateOrganizationPane = compose(
  withYggio(yggio),
)(RawCreateOrganizationPane);

CreateOrganizationPane.propTypes = {
  router: PropTypes.object.isRequired,
};

// /////
// exports
// /////

export default CreateOrganizationPane;
export {
  RawCreateOrganizationPane,
};
