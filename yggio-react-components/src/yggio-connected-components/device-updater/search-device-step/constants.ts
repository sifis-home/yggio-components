enum PARAMETERS {
  name = 'name',
  devEui = 'devEui',
  secret = 'secret',
  mac = 'mac',
  imei = 'imei',
}

const PARAMETER_OPTIONS = [
  {value: PARAMETERS.name, label: 'Name'},
  {value: PARAMETERS.devEui, label: 'DevEUI'},
  {value: PARAMETERS.secret, label: 'Secret'},
  {value: PARAMETERS.mac, label: 'MAC'},
  {value: PARAMETERS.imei, label: 'IMEI'},
];

export {
  PARAMETERS,
  PARAMETER_OPTIONS,
};
