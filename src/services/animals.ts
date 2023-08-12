import { TAnimal } from '../types';

const BASE_URL = 'https://api-ninjas.com/api/animals';

export async function getAnimals(name: string): Promise<TAnimal[] | Error> {
	try {
		const res = await fetch(`${BASE_URL}?name=${name}`, {headers: {'X-Api-Key': import.meta.env.VITE_API_KEY}});
		if (!res.ok) {
			throw new Error('Failed to fetch');
		}
		return res.json();
	} catch (e) {
		return e as Error;
	}
}
