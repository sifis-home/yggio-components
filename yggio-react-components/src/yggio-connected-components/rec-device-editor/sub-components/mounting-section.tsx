import React from 'react';
import {UseMutationResult} from '@tanstack/react-query';

import {InputOptions, Form, MountRecDeviceParams} from '../../../types';

import Button from '../../../components/button';
import Select from '../../../components/select';
import SegmentedControl from '../../../components/segmented-control';
import {HorizontalLine} from '../../../global/styled';
import {RecHeading} from '../styled';

interface Props {
  form: Form;
  options?: {
    realEstate: InputOptions;
    building: InputOptions;
    storey: InputOptions;
    room: InputOptions;
  }
  realEstatesQueryIsLoading: boolean;
  buildingsQueryIsLoading: boolean;
  storeysQueryIsLoading: boolean;
  roomsQueryIsLoading: boolean;
  mountRecDeviceMutation: UseMutationResult<unknown, unknown, MountRecDeviceParams, unknown>;
}

const MountedSection = (props: Props) => {
  return (
    <>
      {/* @ts-ignore - component not typescripted yet */}
      <HorizontalLine margin={'25px 0'} />

      <RecHeading>Mounting</RecHeading>
      <Select
        label={'Real estate'}
        options={props.options?.realEstate || []}
        onChange={evt => {
          props.form.setInputValue('realEstate', evt.target.value);
          props.form.setInputValue('building', '');
          props.form.setInputValue('storey', '');
          props.form.setInputValue('room', '');
        }}
        value={props.form.formInputs.realEstate.value as string}
        isClearable
        isSearchable
        isLoading={props.realEstatesQueryIsLoading}
        isDisabled={props.realEstatesQueryIsLoading}
        margin={'15px 0 15px 0'}
      />
      {!!props.form.formInputs.realEstate.value && (
        <Select
          label={'Building'}
          options={props.options?.building || []}
          onChange={evt => {
            props.form.setInputValue('building', evt.target.value);
            props.form.setInputValue('storey', '');
            props.form.setInputValue('room', '');
          }}
          value={props.form.formInputs.building.value as string}
          isClearable
          isSearchable
          isLoading={props.buildingsQueryIsLoading}
          isDisabled={props.buildingsQueryIsLoading}
          margin={'0 0 15px 0'}
        />
      )}
      {!!props.form.formInputs.building.value && (
        <Select
          label={'Storey'}
          options={props.options?.storey || []}
          onChange={evt => {
            props.form.setInputValue('storey', evt.target.value);
            props.form.setInputValue('room', '');
          }}
          value={props.form.formInputs.storey.value as string}
          isClearable
          isSearchable
          isLoading={props.storeysQueryIsLoading}
          isDisabled={props.storeysQueryIsLoading}
          margin={'0 0 15px 0'}
        />
      )}
      {!!props.form.formInputs.storey.value && (
        <Select
          label={'Room'}
          options={props.options?.room || []}
          onChange={evt => props.form.setInputValue('room', evt.target.value)}
          value={props.form.formInputs.room.value as string}
          isClearable
          isSearchable
          isLoading={props.roomsQueryIsLoading}
          isDisabled={props.roomsQueryIsLoading}
          margin={'0 0 20px 0'}
        />
      )}
      {!!props.form.formInputs.room.value && (
        <>
          <SegmentedControl
            label={'Project'}
            options={[
              {value: 'region', label: 'Region'},
              {value: 'matilda', label: 'Matilda'},
            ]}
            onChange={value => props.form.setInputValue('project', value as string)}
            value={props.form.formInputs.project.value as string}
            margin={'0 0 40px 0'}
            additionalInfo={'TBA'}
          />
          <Button
            label={'Mount device'}
            width={'110px'}
            color={'green'}
            onClick={() => props.mountRecDeviceMutation.mutate({
              realEstateId: (props.form.formInputs.realEstate.value as string),
              roomId: (props.form.formInputs.room.value as string),
              isCastellumMatilda: props.form.formInputs.project.value === 'matilda'
            })}
            isLoading={props.mountRecDeviceMutation.isLoading}
            disabled={props.mountRecDeviceMutation.isLoading}
          />
        </>
      )}
    </>
  );
};

export default MountedSection;
