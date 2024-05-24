export function formatDate(timestamp: string | number | null | undefined, nullValue?: string): string | null {
    return timestamp ? new Date(timestamp).toLocaleString() : (nullValue ?? null);
}