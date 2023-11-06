export function mapToArray<T>( map: Map<string, T> ): T[] {
	const array: T[] = []
	for ( const [ key, value ] of map.entries() ) {
		array.push( value )
	}
	return array
}
