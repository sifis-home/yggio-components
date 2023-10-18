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
        value={props.selectedLocation}
        onChange={evt => {
          const location = evt.target.value;
          props.onChange(location, undefined);
        }}
      />
      {props.selectedLocation && (
        <Select
          placeholder='Select blueprint...'
          options={blueprintOptions}
          onChange={evt => {
            const blueprint = evt.target.value;
            props.onChange(props.selectedLocation, blueprint);
          }}
          value={props.selectedBlueprint}
          isClearable
          margin={'4px 0 0 0'}
        />
      )}
    </>
  );
};

export default LocationSelector;
