import { httpClient } from "@/Services/HttpClient.tsx";

export const ItemPostService = {
    async send(email: string, item_id: number) {
        return httpClient.post("/items/owned", { email, item_id});
    }
};
