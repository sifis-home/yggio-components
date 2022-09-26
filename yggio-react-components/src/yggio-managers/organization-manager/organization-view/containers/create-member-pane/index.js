/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

import {withState} from '../../../../../hocs';
import {withYggio} from '../../../../../yggio-context';

import {
  generateForm,
  getFormValues,
  getFormShape,
  getValidationErrorMessage,
  isFormValid,
  inputValidators,
  generateHandleValueChange,
  generateShowInputValidation,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';

import Button from '../../../../../components/button';
import TextField from '../../../../../components/text-field';

import {
  CreateOrganizationWrapper,
  ButtonsContainer,
} from './styled';


// /////
// The BasicCreateMemberPane - uses only fully processed data
// /////

const BasicCreateMemberPane = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);

  const createMember = async () => {
    if (isFormValid(props.formInputs)) {
      const rawTemplate = getFormValues(props.formInputs);
      // exlude email if length 0 string
      const template = (rawTemplate.email ? rawTemplate : _.omit(rawTemplate, 'email'));
      try {
        await props.createMember({
          orgId: props.orgId,
          template,
        });
        props.router.push(`/organizations/${props.orgId}/summary`);
      } catch (err) {
        // do nothing
      }
    }
  };

  return (
    <CreateOrganizationWrapper>
      <h1>Create new member</h1>
      <TextField
        label="Username (*)"
        name="username"
        onChange={onChange}
        onBlur={onBlur}
        value={props.formInputs.username.value}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.username)}
        margin="0 0 10px 0"
      />
      <TextField
        label="Email"
        name="email"
        onChange={onChange}
        onBlur={onBlur}
        value={props.formInputs.email.value}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.email)}
        margin="0 0 10px 0"
      />
      <TextField
        label="Password (*)"
        name="password"
        onChange={onChange}
        onBlur={onBlur}
        value={props.formInputs.password.value}
        validationErrorMessage={getValidationErrorMessage(props.formInputs.password)}
      />
      <ButtonsContainer>
        <Button
          onClick={createMember}
          content={'Create'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={() => props.router.push(`/organizations/${props.orgId}/summary`)}
        />
      </ButtonsContainer>
    </CreateOrganizationWrapper>
  );
};


BasicCreateMemberPane.propTypes = {
  // from top
  orgId: PropTypes.string.isRequired,
  // from state
  ...getFormShape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  // from yggio
  createMember: PropTypes.func.isRequired,
};

// ////
// RawCreateMemberPane - full data=processing
// ////

const formConfig = {
  username: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a username'),
      ],
    },
  },
  email: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.validEmailAddress,
      ],
    },
  },
  password: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a password'),
      ],
    },
  }
};

const formState = generateForm(formConfig);

const RawCreateMemberPane = compose(
  withState(formState),
)(BasicCreateMemberPane);

RawCreateMemberPane.propTypes = {
  // from top
  orgId: PropTypes.string.isRequired,
  // from yggio
  createMember: PropTypes.func.isRequired,
};

// /////
// CreateMemberPane - fully yggio connected
// /////

const yggio = {
  mapYggioActionsToProps: yggioActions => ({
    createMember: yggioActions.database.organizations.createMember,
  }),
};

const CreateMemberPane = compose(
  withYggio(yggio),
)(RawCreateMemberPane);

CreateMemberPane.propTypes = {
  // from top
  orgId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default CreateMemberPane;
export {
  RawCreateMemberPane,
};
