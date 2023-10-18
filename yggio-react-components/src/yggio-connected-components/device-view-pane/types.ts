import {IconType} from 'react-icons';

interface CalculatedValue {
  id: string;
  value: number;
  from: string;
  to: string;
  date: string;
}

interface CalculatedValues {
  [key: string]: CalculatedValue;
}

interface ChirpstackQueueResponse {
  items: {
    data: string;
    fPort: string;
    confirmed: string;
    fCnt: string;
  }[]
}

interface NetmoreQueueItem {
  requestPayloadHex: string;
  requestFPort: string;
}

type NetmoreQueueResponse = NetmoreQueueItem[];

type GetQueueResponse = ChirpstackQueueResponse | NetmoreQueueResponse;

interface QueueItem {
  data: string;
  fPort: string;
  confirmed?: string;
  fCnt?: string;
}

interface TabItem {
  name: string;
  path: string;
  width?: number;
  icon: {
    file: IconType;
    size: number;
    topPosition?: number;
  }
}

export type {
  CalculatedValues,
  CalculatedValue,
  ChirpstackQueueResponse,
  NetmoreQueueResponse,
  GetQueueResponse,
  QueueItem,
  TabItem,
};
