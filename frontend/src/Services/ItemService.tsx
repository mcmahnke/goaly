import { httpClient } from "@/Services/HttpClient.tsx";
import {ItemType} from "@/GoalyTypes.ts";

export const ItemPostService = {
    async send(email: string, item_id: number) {
        return httpClient.post("/items/owned", { email, item_id});
    }
};
