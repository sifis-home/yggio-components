import _ from 'lodash';

const transformBase64StringToBinary = (base64string: string) => {
  // Convert to binary data for mongodb
  const split = _.split(base64string, ',');
  const [, str] = split;
  const logoData = Buffer.from(str, 'base64');
  return logoData;
};

const transformBinaryToBase64String = (fileType: string, data: Buffer): string => {
  return `data:${fileType};base64,${data.toString('base64')}`;
};

export {
  transformBase64StringToBinary,
  transformBinaryToBase64String,
};
