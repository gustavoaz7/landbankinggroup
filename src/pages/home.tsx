import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants";
// import { getAnimals } from "../services/animals";
import { TAnimal } from "../types";
import { AnimalSearch } from "../components/AnimalSearch";
import { animalsMock } from "../mock-data";


export const HomePage: FC = () => {
	const [ loggedUser ] = useLocalStorage(STORAGE_KEYS.LOGGED_USER, '');
	const [ favouriteAnimals ] = useLocalStorage<string[]>(STORAGE_KEYS.FAVOURITE_ANIMALS, []);
	const [ animals, setAnimals ] = useState<TAnimal[]>([]);
	const [ isLoading, setIsLoading ] = useState(false);

	const handleSearch = useCallback(async (name: string) => {
		setIsLoading(true);
		// Mocking result due to CORS issue when trying to fetch data from API-Ninjas
		/**
		 * const res = await getAnimals(name);
		 * if (res instanceof Error) {
		 *  	// handle error
		 * } else {
		 * 	setAnimals(res);
		 * }
		 */
		
		await new Promise(res => setTimeout(res, 1000));
		setAnimals(animalsMock)
		setIsLoading(false);
	}, []);

	return (
		<>
			<h1 className="mb-12">Welcome back, {loggedUser}!</h1>

			<h2 className="text-2xl leading-9 text-gray-900">
				Search for a wild animal
			</h2>
			<AnimalSearch onSubmit={handleSearch} loading={isLoading} />

			{favouriteAnimals.length ? <div>
				<h2 className="mt-4 text-2xl leading-9 text-gray-900">
					Favourite Animals
				</h2>
				<ul>
					{favouriteAnimals.map(animal => (
						<li key={animal}>
							<Link to={animal}>{animal}</Link>
						</li>
					))}
				</ul>
			</div> : null}

			{animals.length ? <div>
				<h2 className="mt-4 text-2xl leading-9 text-gray-900">
					Wild Animals
				</h2>
				<ul>
					{animals.map(animal => (
						<li key={animal.name}>
							<Link to={animal.name}>{animal.name}</Link>
						</li>
					))}
				</ul>
			</div> : null}
		</>
	)
}
