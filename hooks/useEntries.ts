import { EntriesAPI } from "@/api/EntriesAPI";
import { CreateEntryDTO } from "@/types/CreateEntryDTO";
import { Entry } from "@/types/entry";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useEntries = () => {
    const queryClient = useQueryClient();
  
    // Fetch entries
    const { data: entries, isLoading, error, refetch } = useQuery({
        queryKey: ['entries'],
        queryFn: EntriesAPI.getEntries,
    });
  
    // Create a new entry
    const createEntry = useMutation({
        mutationFn: (entry: CreateEntryDTO) => EntriesAPI.createEntry(entry),
      onSuccess: () => {
        // Invalidate the entries query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ['entries'] });
      },
    });
  
    // Delete an entry
    const deleteEntry = useMutation({
        mutationFn: (entry: Entry) => EntriesAPI.deleteEntry(entry.id),
      onSuccess: () => {
        // Invalidate the entries query to refetch the updated list
        queryClient.invalidateQueries({ queryKey: ['entries'] });
      },
    });
  
    return {
        entries,
        isLoading,
        error,
        createEntry,
        deleteEntry,
        refetch,
    };
};