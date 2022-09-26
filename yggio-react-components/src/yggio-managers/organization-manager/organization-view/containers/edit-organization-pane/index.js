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

import {createSelector} from 'reselect';
import {
  withState,
  withEffect,
  withReselect,
} from '../../../../../hocs';
import {
  withYggio,
} from '../../../../../yggio-context';

import Button from '../../../../../components/button';
import TextField from '../../../../../components/text-field';

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

import {
  EditOrganizationWrapper,
  ButtonsContainer,
} from './styled';


// /////
// The BasicEditOrganizationPane - uses only fully processed data
// /////

const BasicEditOrganizationPane = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);

  const saveEdits = async () => {
    if (isFormValid(props.formInputs)) {
      const template = getFormValues(props.formInputs);
      try {
        await props.saveEdits({
          orgId: props.orgId,
          template,
        });
        props.router.push(`/organizations/${props.orgId}/summary`);
      } catch (err) {
        // do nothing?
      }
    }
  };

  return (
    <EditOrganizationWrapper>
      <h1>Edit organization details</h1>
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
          onClick={saveEdits}
          color="green"
          content={'Save'}
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={() => props.router.push(`/organizations/${props.orgId}/summary`)}
        />
      </ButtonsContainer>
    </EditOrganizationWrapper>
  );
};

BasicEditOrganizationPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from yggio
  saveEdits: PropTypes.func.isRequired,
  // from form state
  ...getFormShape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};


// ////
// RawEditOrganizationPane - full data-processing
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

// extract organization
const organizationSelector = createSelector(
  props => props.organizations,
  props => props.orgId,
  (organizations, orgId) => {
    const organization = _.get(organizations, orgId);
    return organization;
  },
);

const initialFormSelector = createSelector(
  organizationSelector,
  organization => {
    const initialForm = {
      name: _.get(organization, 'name', ''),
      description: _.get(organization, 'description', ''),
    };
    return initialForm;
  },
);

const reselectors = {
  initialForm: initialFormSelector,
};

const initializeFormEffect = props => {
  if (!props.isPopulated) {
    props.populateInputValues(props.initialForm);
  }
};

// this one can be more easily mocked in stories
const RawEditOrganizationPane = compose(
  withState(formState),
  withReselect(reselectors),
  withEffect(initializeFormEffect, {init: []}),
)(BasicEditOrganizationPane);

RawEditOrganizationPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  // from yggio
  saveEdits: PropTypes.func.isRequired,
  organizations: PropTypes.object.isRequired, // for reselect
};


// /////
// EditOrganizationPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
  }),
  mapYggioActionsToProps: yggioActions => ({
    saveEdits: yggioActions.database.organizations.updateOrganization,
  }),
};


const EditOrganizationPane = compose(
  withYggio(yggio),
)(RawEditOrganizationPane);

EditOrganizationPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default EditOrganizationPane;
export {
  RawEditOrganizationPane,
};
