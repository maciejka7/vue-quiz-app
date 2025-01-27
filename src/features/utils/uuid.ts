

export type UUID = ReturnType<Crypto['randomUUID']>

export const uuid = () => crypto.randomUUID()
