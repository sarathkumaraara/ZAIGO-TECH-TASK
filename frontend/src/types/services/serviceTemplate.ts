/* eslint-disable @typescript-eslint/no-explicit-any */
export type serviceTemplate = {
  url: string
  body: object
  staticKey?: string
  data: string
}

type baseResponse = {
  mData: any;
  mMessage: string;
  mStatusCode: number;
}

export type handleResponseArgs = {
  response: baseResponse;
  message?: string;
  navigate?: (path: string) => void;
}