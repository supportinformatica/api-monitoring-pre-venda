import axios from 'axios';
import * as Settings from '@src/server/settings';

type Status = 'OK' | 'ZERO_RESULTS' | 'REQUEST_DENIED' | 'INVALID_REQUEST';

interface Distance {
  text: string; // ex: "285 km"
  value: number; // 285000 (meters)
}

interface Duration {
  text: string; // ex: "4 hours 31mins"
  value: number; // 16230 (seconds)
}

interface Element {
  distance: Distance;
  duration: Duration;
  status: Status;
}

interface Elements {
  elements: Element[];
}

export interface ExternalDistance {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: Elements[];
  status: Status;
}

export const externalSMS = axios.create({
  baseURL: Settings.EXTERNAL_SMS_URL,
  timeout: Settings.EXTERNAL_TIMEOUT
});

export const externalDistance = axios.create({
  baseURL: Settings.EXTERNAL_DISTANCE_URL,
  timeout: Settings.EXTERNAL_TIMEOUT
});
