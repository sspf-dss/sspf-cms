// src/api/mail/types.d.ts

export interface SendMailInput {
    to: string;
    subject?: string;
    html?: string;
    text?: string;
    template?: string;
    key?: string;
    variables?: Record<string, any>;
}
