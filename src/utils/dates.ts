export function formatDate(timestamp: string | number | null | undefined): string | null {
    return timestamp ? new Date(timestamp).toLocaleString() : null;
}