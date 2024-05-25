import crypto from 'crypto-js';

type Snippet = {
    rawText: string;
    password?: string;
}

export type InternalSnippet = {
    encryptedText: string;
    hasPassword: boolean;
    key: string;
}

export async function buildSnippetPayload(data: Snippet): Promise<string> {
    const key = generateKey()
    const internalSnippet: InternalSnippet = {
        key,
        encryptedText: await encrypt(data.rawText, key + (data.password || '')),
        hasPassword: !!data.password,
    }

    return JSON.stringify(internalSnippet);
}

export function parseSnippetPayload(payload: string): InternalSnippet {
    const internalSnippet: InternalSnippet = JSON.parse(payload)

    return {
        key: internalSnippet.key,
        encryptedText: internalSnippet.encryptedText,
        hasPassword: internalSnippet.hasPassword,
    }
}

export async function decodeSnippetText(encryptedText: string, key: string, password?: string): Promise<string> {
    return decrypt(encryptedText, key + (password || ''))
}

function generateKey(): string {
    return window.crypto.randomUUID().replace(/-/g, '').slice(0, 16)
}

async function encrypt(text: string, key: string): Promise<string> {
    return crypto.AES.encrypt(text, key).toString();
}

function decrypt(text: string, key: string): string {
    return crypto.AES.decrypt(text, key).toString(crypto.enc.Utf8)
}