import React, {useState} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
// import _ from 'lodash';

// Logic
import {locationsApi, locationsRequests} from '../../../api';
import {insertDeviceIntoLocation, getRequestErrorMessage} from '../../../utils';
import {Device, Location} from '../../../types';
// import {selectLocationBlueprintPairs} from './selectors';

// UI
import LocationSelector from '../../location-selector';
import InfoBox from '../../../components/info-box';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';
// import {
//   Table,
//   TableHeading,
//   TableButton,
//   ParameterName,
//   ParameterValue,
// } from './styled';

interface LocationStepProps {
  stepForward: () => void;
  stepBack: () => void;
  device: Device;
}

const LocationStep = (props: LocationStepProps) => {

  const locationsQuery = locationsApi.useLocationsQuery();

  // const locationsWithDeviceQuery = locationsApi.useLocationsWithDeviceQuery(props.device._id);

  // const locationBlueprintPairs = selectLocationBlueprintPairs(
  //   props.device._id,
  //   locationsWithDeviceQuery.data,
  // );

  const queryClient = useQueryClient();

  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>();

  const updateLocationMutation = useMutation(
    async (location: Location) => locationsRequests.update(location),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['locations']);
        await queryClient.invalidateQueries(['location', selectedLocation]);
        props.stepForward();
      },
    }
  );

  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Add device to location'
      />
      <WizardContent>
        {/*
          Because of lack of time,
          show current locations/blueprint will have to be added later
        */}
        {/* <Table>
          <>
            <TableHeading>Location</TableHeading>
            <TableHeading>Blueprint</TableHeading>
            <TableHeading />
          </>
          {_.map(locationBlueprintPairs, pair => (
            <React.Fragment key={`${pair.location}${pair.blueprint}`}>
              <ParameterName>{pair.location}</ParameterName>
              <ParameterValue>{pair.blueprint}</ParameterValue>
              <TableButton
                hoverColor={'red'}
                title={'Remove device from location'}
              >
                <Icon icon={removeIcon as object} size={18} />
              </TableButton>
            </React.Fragment>
          ))}
        </Table> */}
        <LocationSelector
          locations={locationsQuery.data}
          selectedLocation={selectedLocation}
          selectedBlueprint={selectedBlueprint}
          onChange={(location?: string, blueprint?: string) => {
            setSelectedLocation(location);
            setSelectedBlueprint(blueprint);
          }}
        />
        {updateLocationMutation.isError && (
          <InfoBox
            heading='Could not update location'
            type={'error'}
            content={getRequestErrorMessage(updateLocationMutation.error)}
            margin={'20px 0 0 0'}
          />
        )}
      </WizardContent>
      <WizardFooter
        onContinue={() => {
          const location = insertDeviceIntoLocation({
            deviceId: props.device._id,
            locations: locationsQuery.data!,
            locationId: selectedLocation!,
            blueprintId: selectedBlueprint!,
          });
          updateLocationMutation.mutate(location);
        }}
        onBack={props.stepBack}
        disableContinueButton={!selectedBlueprint}
        showContinueButtonSpinner={updateLocationMutation.isLoading}
      />
    </WizardStepContainer>
  );
};

export default LocationStep;
