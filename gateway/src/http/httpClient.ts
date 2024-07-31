import axios, { AxiosRequestConfig } from 'axios';
import { Route } from '../routes';
import { IError } from '../middlewares/error.interface';
export const excuteRequest = async (route: Route, data: any) => {
  const payloadRequest: AxiosRequestConfig = {
    method: route.method,
    url: route.target,
    responseType: "json",
    data
  }

  try {
    console.debug("request:", payloadRequest);
    const result = await axios(payloadRequest);
    return result.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Si hay una respuesta del servidor con un error
      if (error.response) {
        const err: Partial<IError> = new Error(error.response.data.message);
        err.message = error.response.data.message;
        err.stack = error.response.data.stack;
        err.status = error.response.status;
        throw err;
      } else if (error.request) {
        throw new Error("No se recibió respuesta");
      } else {
        // Otros errores que pueden ocurrir durante la configuración de la solicitud
        throw new Error(error.message);
      }
    } else {
      throw error;
    }
  }
}