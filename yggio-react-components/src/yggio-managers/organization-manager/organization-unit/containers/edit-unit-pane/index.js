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
import {organizationUtils} from '../../../../../utils';
import {
  withState,
  withEffect,
  withReselect,
} from '../../../../../hocs';
import {
  withYggio,
} from '../../../../../yggio-context';

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
  Wrapper,
  ButtonsContainer,
} from './styled';

import TextField from '../../../../../components/text-field';
import Button from '../../../../../components/button';


// /////
// The BasicEditUnitPane - uses only fully processed data
// /////

const BasicEditUnitPane = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);

  const saveEdits = async () => {
    if (isFormValid(props.formInputs)) {
      const template = getFormValues(props.formInputs);
      try {
        await props.saveEdits({
          orgId: props.orgId,
          unitId: props.unitId,
          template,
        });
        props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
      } catch (err) {
        // do nothing?
      }
    }
  };

  return (
    <Wrapper>
      <h1>Edit unit</h1>
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
          content={'Save'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={() => {
            props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
          }}
        />
      </ButtonsContainer>
    </Wrapper>
  );
};

BasicEditUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  saveEdits: PropTypes.func.isRequired,
  // from state
  ...getFormShape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};


// ////
// RawEditUnitPane - full data processing
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

// filter for unit
const unitSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const unit = organizationUtils.findUnit(organization, unitId);
    return unit;
  },
);

const initialFormSelector = createSelector(
  unitSelector,
  unit => {
    const initialForm = {
      name: _.get(unit, 'name', ''),
      description: _.get(unit, 'description', ''),
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
const RawEditUnitPane = compose(
  withState(formState),
  withReselect(reselectors),
  withEffect(initializeFormEffect, {init: []}),
)(BasicEditUnitPane);

RawEditUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  saveEdits: PropTypes.func.isRequired,
  organizations: PropTypes.object.isRequired, // for reselect
};


// /////
// EditUnitPane - fully yggio connected
// /////

// and yggio
const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
  }),
  mapYggioActionsToProps: yggioActions => ({
    saveEdits: yggioActions.database.organizations.updateUnit,
  }),
};

const EditUnitPane = compose(
  withYggio(yggio),
)(RawEditUnitPane);

EditUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default EditUnitPane;
export {
  RawEditUnitPane,
};
