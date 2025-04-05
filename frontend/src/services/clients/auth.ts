import { client } from "../serviceTemplate";
import * as url from "../endpoints/endpointsExport"
import { clients } from "../../types/typesExport";

const api = new client();

//auth
export const accountLogin = (body: clients["body"]) => api.create(url.LOGIN, body);

export const accountRegister = (body:clients["body"]) => api.post(url.REGISTER, body)

export const getAuthToken = () =>
  api.post(url.GET_AUTH_TOKEN, {} );

export const getMyDetails = (id: clients["id"]) => api.get(url.GET_MY_DETAILS.replace(":id",id))


