import { APIRequest } from "../utils/request";

const api = new APIRequest();

export const findItems = async () => {
    return api.get({ 
        url: "/item/find/" 
    });
};

export const deleteItem = async (id) => {
    return api.delete({ 
        url: `/item/delete/`,
        bodyObj: [String(id)]
    });
};