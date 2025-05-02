import { CreateEntryDTO } from "@/types/CreateEntryDTO";
import { Entry } from "@/types/entry";

const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export class EntriesAPI {
    static async getEntries(): Promise<Entry[]> {
        const response = await fetch(`${apiUrl}/api/entries`);
        if (!response.ok) {
            throw new Error('Failed to fetch entries');
        }
        return await response.json();
    }

    static async createEntry(entry: CreateEntryDTO): Promise<Entry> {
        const response = await fetch(`${apiUrl}/api/entries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create entry');
        }
        return await response.json();
    }

    static async deleteEntry(entryId: number): Promise<Entry> {
        const response = await fetch(`${apiUrl}/api/entries/${entryId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.log("errorData", errorData);
            
            throw new Error(errorData.message || 'Failed to delete entry');
        }
        
        const responseData = await response.json();
        return responseData;
    }

}