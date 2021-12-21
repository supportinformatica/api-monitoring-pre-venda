export interface SendWarn {
  name: string;
  quantity: number;
}

export interface SmsPayload {
  key: string;
  type: 9;
  number: number;
  msg: string;
}

export interface SmsServiceDTO {
  sendWarnSync: (payload: SendWarn[]) => void;
  sendWarnSales: (payload: SendWarn[]) => void;
}
