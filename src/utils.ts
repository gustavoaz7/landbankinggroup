export function snakeCaseToText(string: string): string {
	return string.replace(/_/g, ' ').trim();
}
