import { STORAGE_KEYS } from '../constants';
import { TAnimal } from '../types';

const BASE_URL = 'https://api-ninjas.com/api/animals';

export async function getAnimals(name: string): Promise<TAnimal[] | Error> {
	const cachedAnimals: Record<string, TAnimal | undefined> = JSON.parse(
		window.localStorage.get(STORAGE_KEYS.CACHED_ANIMALS) || '{}'
	);
	const cached = cachedAnimals[name];

	if (cached) return [cached];

	try {
		const res = await fetch(`${BASE_URL}?name=${name}`, {headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}});
		if (!res.ok) {
			throw new Error('Failed to fetch');
		}
		const animals: TAnimal[] = await res.json();

		animals.forEach(animal => {
			cachedAnimals[animal.name] = animal;
		});
		window.localStorage
			.setItem(STORAGE_KEYS.CACHED_ANIMALS, JSON.stringify(cachedAnimals));

		return animals;
	} catch (e) {
		return e as Error;
	}
}
