
declare module 'Instagram' {

    export interface User {
        id: string,
        username: string,
        followers?: number[],
        following?: number[],
        handle: string,
        photoUrl?: string,
    }

    export interface Status {
        id: string,
        userId: number,
        title: string,
        body: string,
        attachment?: Attachment
    }

    export type Feed = Status[]

    export interface Attachment {
        id: string,
        userId: string,
        attachmentType: 'video' | 'photo',
        attachmentUrl: string
    }

    export type TableName = 'user' | 'attachment' | 'status'
}