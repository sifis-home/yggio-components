import {DEFAULTS} from './constants';

const styles = props => ({
  root: {
    maxWidth: props.width || DEFAULTS.width,
    margin: props.margin || DEFAULTS.margin,
    flexGrow: 1,
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    height: '25px',
    fontSize: '13px',
  },
  labelName: {
    marginRight: '5px',
  },
  valueFalsy: {
    color: '#555',
    fontStyle: 'italic',
  },
  valueString: {
    color: '#bf2615',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  valueBoolean: {
    color: '#00805d',
    fontWeight: 'bold',
  },
  valueNumber: {
    color: '#00608a',
    fontWeight: 'bold',
  },
  valueDefault: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
