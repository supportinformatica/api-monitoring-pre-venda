import axios from 'axios';
import * as Settings from '@src/server/settings';

export const externalSMS = axios.create({
  baseURL: Settings.EXTERNAL_SMS_URL,
  timeout: Settings.EXTERNAL_TIMEOUT
});
