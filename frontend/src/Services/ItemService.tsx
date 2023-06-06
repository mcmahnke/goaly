import { httpClient } from "@/Services/HttpClient.tsx";
import {ItemType} from "@/GoalyTypes.ts";

export const ItemPostService = {
    async send(user_id: number, item_id: number) {
        return httpClient.post("/items/owned", { user_id, item_id});
    }
};

/*export async function ItemsOwnedService() = {
    const itemsOwned =
        await httpClient.search("/items/owned", user_id);
    return itemsOwned.data;
} */
