import { CookieOptions } from 'express'

export const IS_PUBLIC_KEY = 'isPublic'
export const REFRESH_TOKEN_COOKIE = 'refreshToken'

export const COOKIE_OPTIONS: CookieOptions = {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
}

export const IMAGE_CONFIG = {
    field: 'image',
    maxSize: 50, //in mbs
    allowedTypes: '.(png|jpeg|jpg)',
}

export const DOCUMENT_CONFIG = {
    field: 'document',
    maxSize: 50, //in mbs
    allowedTypes: '.(png|jpeg|jpg|pdf|csv|doc|docx)',
}

export const UPLOAD_TAGS = {
    HARVEST: {
        image: {
            tag: 'harvest-image',
            type: 'file',
        },
    },
    DOCUMENT: {
        tag: 'document',
        type: 'file',
    },
}
