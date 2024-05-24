export function getSnippetAbsoluteUrl(id: string) {
    return `${window.location.origin}${getSnippetRelativeUrl(id)}`
}

export function getSnippetRelativeUrl(id: string) {
    return `/snippet/${id}`
}