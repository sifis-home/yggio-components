import dynamic from 'next/dynamic';
import MapButtons from './map-buttons';

const Markers = dynamic(() => import('./markers'), {ssr: false});

export {
  Markers,
  MapButtons,
};
