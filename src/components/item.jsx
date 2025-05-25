import { APIRequest } from "../utils/request";

const api = new APIRequest();

export const findItems = async (scannedId) => {
    console.log(scannedId)
    return api.get({ 
        url: `/item/find/${scannedId}`
    });
};

export const deleteItem = async (scannedId) => {
    return api.delete({ 
        url: `/item/delete/`,
        bodyObj: [String(scannedId)]
    });
};