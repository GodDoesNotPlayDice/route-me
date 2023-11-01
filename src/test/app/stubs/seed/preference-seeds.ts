import {
	newPreference,
	Preference
} from 'src/package/preference/domain/models/preference'

export const preferenceSeeds : Preference[] = [
	newPreference({
		icon: 'logo-no-smoking',
		name: 'No fumar',
		source: 'ionic'
	}).unwrap(),
	newPreference({
		icon: 'volume-mute-outline',
		name: 'Silencio',
		source: 'ionic'
	}).unwrap(),
	newPreference({
		icon: 'thermometer-outline',
		name: 'Temperatura',
		source: 'ionic'
	}).unwrap(),
	newPreference({
		icon: 'musical-notes-outline',
		name: 'Musica',
		source: 'ionic'
	}).unwrap(),
	newPreference({
		icon: 'record_voice_over',
		name: 'Charlar',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'pin_drop',
		name: 'Paradas Adicionales',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'pets',
		name: 'Mascotas permitidas',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'accessible',
		name: 'Asientos preferidos',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'masks',
		name: 'Cubre bocas',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'no_food',
		name: 'No alimentos',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'music_off',
		name: 'No musica alta',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'alt_route',
		name: 'Rutas personalizadas',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'electrical_services',
		name: 'Cargador de dispositivos',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'liquor',
		name: 'Aguas o bebidas ',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'chair_alt',
		name: 'Silla de seguridad para niños',
		source: 'angular'
	}).unwrap(),
	newPreference({
		icon: 'bag-handle-outline',
		name: 'Espacio para equipaje',
		source: 'ionic'
	}).unwrap(),
]
