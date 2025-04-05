import { client } from "../serviceTemplate";
import * as url from "../endpoints/endpointsExport"
import { clients } from "../../types/typesExport";

const api = new client();

//auth
export const createTask = (body: clients["body"]) => api.create(url.TASK_API, body);

export const getAllTaskList = (page:number, status:string) => api.get(`${url.TASK_API}?page=${page}&status=${status}`)

export const getTaskDetails = (id: clients["id"]) => api.get(url.TASK_API.replace(":id",id))

export const updateTask = (id: clients["id"],body:clients["body"]) => api.post(url.TASK_API.replace(":id",id), body)

export const deleteTask = (id: clients["id"]) => api.delete(url.TASK_API.replace(":id",id))


