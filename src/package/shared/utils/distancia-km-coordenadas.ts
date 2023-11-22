export function distanciaKmCoordenadas( lat1: number, lon1: number,
	lat2: number, lon2: number ): number {
	const radioTierraKm = 6371 // Radio de la Tierra en kilómetros

	// Convertir las latitudes y longitudes de grados a radianes
	const lat1Rad = ( lat1 * Math.PI ) / 180
	const lon1Rad = ( lon1 * Math.PI ) / 180
	const lat2Rad = ( lat2 * Math.PI ) / 180
	const lon2Rad = ( lon2 * Math.PI ) / 180

	// Diferencias en latitud y longitud
	const latDiff = lat2Rad - lat1Rad
	const lonDiff = lon2Rad - lon1Rad

	// Calcular la distancia utilizando la fórmula del haversine
	const a = Math.sin( latDiff / 2 ) * Math.sin( latDiff / 2 ) +
		Math.cos( lat1Rad ) * Math.cos( lat2Rad ) *
		Math.sin( lonDiff / 2 ) * Math.sin( lonDiff / 2 )
	const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) )
	return radioTierraKm * c
}
