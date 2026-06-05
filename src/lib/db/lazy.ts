export function lazy<T>(get: () => Promise<T>): () => Promise<T> {
	let promise = null

	return () => {
		promise ??= get()

		return promise
	}
}
