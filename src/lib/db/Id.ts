export type Id = string

export const Id = {
	new: () => crypto.randomUUID(),
}
