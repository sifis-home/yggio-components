/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import {selectLocationOptions, selectBlueprintOptions} from './selectors';
import {Locations} from '../../types';
import Select from '../../components/select';

interface LocationSelectorProps {
  locations?: Locations;
  selectedLocation?: string;
  selectedBlueprint?: string;
  onChange: (selectedLocation?: string, selectedBlueprint?: string) => void;
}

const LocationSelector = (props: LocationSelectorProps) => {

  const locationOptions = selectLocationOptions(props.locations);
  const blueprintOptions = selectBlueprintOptions(props.selectedLocation, props.locations);

  return (
    <>
      <Select
        label='Location'
        placeholder='Select location...'
        options={locationOptions}
        isClearable
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          const location = evt.target.value;
          props.onChange(location, undefined);
        }}
      />
      {props.selectedLocation && (
        <Select
          placeholder='Select blueprint...'
          options={blueprintOptions}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const blueprint = evt.target.value;
            props.onChange(props.selectedLocation, blueprint);
          }}
          value={props.selectedBlueprint || null}
          isClearable
          margin={'4px 0 0 0'}
        />
      )}
    </>
  );
};

export default LocationSelector;
