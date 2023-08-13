import {
	ChangeEventHandler,
	FC,
	Fragment,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router-dom";
import { TAnimal } from "../types";
import { animalsMock } from "../mock-data";
import { snakeCaseToText } from "../utils";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants";

export const AnimalPage: FC = () => {
	const params = useParams();
	const animalName = params.animal!;
	const [ animal, setAnimal ] = useState<TAnimal | null>(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [
		favouriteAnimals,
		setFavouriteAnimals,
	] = useLocalStorage<string[]>(STORAGE_KEYS.FAVOURITE_ANIMALS, []);
	const isFavourite = favouriteAnimals.includes(animalName);
	const [
		animalRatings,
		setAnimalRatings,
	] = useLocalStorage<Record<string, number>>(STORAGE_KEYS.ANIMAL_RATINGS, {});
	const [
		allLikedAttrs,
	] = useLocalStorage<Record<string, string[]>>(STORAGE_KEYS.LIKED_ATTRS, {});
	const [
		allDislikedAttrs,
	] = useLocalStorage<Record<string, string[]>>(STORAGE_KEYS.DISLIKED_ATTRS, {});
	const rating = animalRatings[animalName];
	// WIP - not enough time to finish implementing like/dislike feature
	const likedAttrs = allLikedAttrs[animalName];
	const dislikedAttrs = allDislikedAttrs[animalName];

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			// Mocking result due to CORS issue when trying to fetch data from API-Ninjas
			/**
			 * const res = await getAnimals(params.animal);
			 * if (res instanceof Error) {
			 *  	// handle error
			 * } else {
			 * 	setAnimals(res);
			 * }
			 */
			
			await new Promise(res => setTimeout(res, 1000));
			setAnimal(animalsMock.find(a => a.name === animalName)!);
			setIsLoading(false);
		})();
	}, [animalName]);

	const handleFavouriteCheck = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
		const set = new Set(favouriteAnimals);
		if (e.target.checked) {
			set.add(animalName);
		} else {
			set.delete(animalName);
		}
		setFavouriteAnimals([...set]);
	}, [favouriteAnimals, animalName, setFavouriteAnimals]);

	const handleRatingChange = useCallback<ChangeEventHandler<HTMLSelectElement>>((e) => {
		const newRating = +e.target.value;
		setAnimalRatings({...animalRatings, [animalName]: newRating})
	}, [animalRatings, animalName, setAnimalRatings])

	return (
		<div>
			<div className="flex flex-row space-between items-center">
				<h1 className="font-bold text-2xl">{params.animal}</h1>
				{animal ? (
					<div className="ml-12">
						<label>
							❤️ <input type="checkbox" checked={isFavourite} onChange={handleFavouriteCheck}/>
						</label>
						<label className="ml-6">🏆
							<select onChange={handleRatingChange} value={rating}>
								{[...Array(11)].map((_, i) => (
									<option key={i} value={i}>{i}</option>
								))}
							</select>
						</label>
					</div>
				) : null}
			</div>
			{isLoading ? (
				<p>Searching for {params.animal}...</p>
			) : null}
			{animal ? (<>
				<div>
					{/* TODO: componentize the following to avoid code duplicaion */}
					<div>
						<h3 className="font-bold">Taxonomy</h3>
						<dl className="grid grid-cols-2 pl-4 gap-x-4 w-fit">
							{Object.entries(animal.taxonomy).map(([key, value]) => (
								<Fragment key={key}>
									<dt className="font-medium">{snakeCaseToText(key)}</dt>
									<dd>{value}</dd>
								</Fragment>
							))}
							<dt></dt>
						</dl>
					</div>
					<div>
						<h3 className="font-bold">Locations</h3>
						<ul>
							{animal.locations.map(loc => (
								<li key={loc} className="pl-4">{loc}</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					<h3 className="font-bold">Characteristics</h3>
					<dl className="grid grid-cols-[max-content_1fr] pl-4 gap-x-4 w-fit">
						{Object.entries(animal.characteristics).map(([key, value]) => (
							<Fragment key={key}>
								<dt className="font-medium">{snakeCaseToText(key)}</dt>
								<dd>{value}</dd>
							</Fragment>
						))}
					</dl>
				</div>
			</>) : null}
		</div>
	)
};
