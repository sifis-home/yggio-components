import {useSockets} from './hooks';

const WebSocket = (props: {children: React.FC}) => {
  useSockets();
  return props.children;
};

export {
  WebSocket,
};
