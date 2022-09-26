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

import {
  Wrapper,
  ButtonsContainer,
} from './styled';

import TextField from '../../../../../components/text-field';
import Button from '../../../../../components/button';

// /////
// The BasicCreateUnitPane - uses only fully processed data
// /////

const BasicCreateUnitPane = props => {
  const onChange = generateHandleValueChange(props);
  const onBlur = generateShowInputValidation(props);

  const createUnit = async () => {
    if (isFormValid(props.formInputs)) {
      const template = getFormValues(props.formInputs);
      try {
        await props.createUnit({
          orgId: props.orgId,
          parentUnitId: props.unitId,
          template,
        });
        props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/subunits`);
      } catch (err) {
        // do nothing?
      }
    }
  };

  return (
    <Wrapper>
      <h1>{'Create subunit'}</h1>
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
        isOptional
        value={props.formInputs.description.value}
      />
      <ButtonsContainer>
        <Button
          onClick={createUnit}
          content={'Create'}
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


BasicCreateUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  createUnit: PropTypes.func.isRequired,
  // from form state
  ...getFormShape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

// ////
// RawCreateUnitPane - full data processing
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

const RawCreateUnitPane = compose(
  withState(formState),
)(BasicCreateUnitPane);

RawCreateUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  createUnit: PropTypes.func.isRequired,
};

// /////
// CreateUnitPane - fully yggio connected
// /////

const yggio = {
  mapYggioActionsToProps: yggioActions => ({
    createUnit: yggioActions.database.organizations.createUnit,
  }),
};

const CreateUnitPane = compose(
  withYggio(yggio),
)(RawCreateUnitPane);

CreateUnitPane.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};

// ////
// exports
// ////

export default CreateUnitPane;
export {
  RawCreateUnitPane,
};
