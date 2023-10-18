declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.jpeg' {
  const value: string;
  export = value;
}

declare module 'precompiled-mqtt/dist/mqtt.browser' {
  import MQTT from 'mqtt/types';

  export default MQTT;
}
