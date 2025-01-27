
export interface AppError {
    error?: boolean,
    message: string
}

export const errorFactory = (
    message: AppError['message'],
    error: AppError['error'] = true,
): AppError => (
    { error, message }
)

export const noError = (): AppError => ({
    error: false,
    message: 'ok'
})