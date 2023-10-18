// NOTE: Add these again when more validation has been added to the backend
/*
const generalErrorSelector = createSelector(
  props => props.batchCreateDevicesRequest,
  request => {
    if (!request.err) return;
    const isValidationError =_.get(request, 'err.response.data.validationErrors');
    if (isValidationError) return;
    return request.err.message || 'Unknown error';
  }
);

const validationErrorsSelector = createSelector(
  props => props.batchCreateDevicesRequest,
  props => props.uploadItems,
  (request, uploadItems) => {
    const errors =_.get(request, 'err.response.data.validationErrors');
    if (!errors) return [];
    const validationErrors = _.map(errors, err => {
      if (_.isNil(err.index)) {
        return {error: err.error};
      }
      return {
        index: err.index,
        error: err.error,
        ...uploadItems[err.index],
      }
    });
    return validationErrors;
  },
);

const topValidationErrorsSelector = createSelector(
  validationErrorsSelector,
  getTopErrors,
);
*/
