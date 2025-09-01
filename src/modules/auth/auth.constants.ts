export const JWT_ACCESS_TOKEN_EXPIRY_TIME = '1h'
export const JWT_REFRESH_TOKEN_EXPIRY_TIME = '30days'

export const SWAGGER_API_TAG = 'auth'

export const SWAGGER_SUMMARIES = {
    LOGIN: 'Login User',
    REFRESH_TOKEN: 'Refresh Access Token',
    REFRESH_MAP_TOKEN: 'Refresh Map Access Token',
}

export const SWAGGER_DESCRIPTIONS = {
    LOGIN: {
        SUCCESS: 'User logged in succesfully',
    },
    REFRESH_TOKEN: {
        SUCCESS: 'New Access token generated',
    },
    REFRESH_MAP_TOKEN: {
        SUCCESS: 'New OS Maps token generated',
    },
}

export const EXCEPTIONS = {
    unAuthorized: {
        description: 'Unauthorized',
        example: {
            statusCode: 401,
            message: 'Unauthorized',
        },
    },
    invalidLoginCredentials: {
        description: 'Invalid Login Credentials',
        example: {
            statusCode: 401,
            message: 'Invalid Login Credentials',
        },
    },
    invalidRefreshToken: {
        description: 'Invalid Refresh Token',
        example: {
            statusCode: 401,
            message: 'Invalid Refresh Token',
        },
    },
    userDoesNotExist: {
        description: 'User with the given email does not exist.',
        example: {
            statusCode: 404,
            message:
                'User with the given email does not exist. Please create an account first.',
        },
    },
}
