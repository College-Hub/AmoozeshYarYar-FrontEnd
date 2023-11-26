import { ERROR_CODE } from '../Config/ressources/errorCode'
export const errorHandler = (error) => {
    const { status, data } = error;
    throw new Error(`${ERROR_CODE[data.customeStatus]}`)

};