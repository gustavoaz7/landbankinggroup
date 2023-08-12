import { FC } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../constants";

export const HomePage: FC = () => {
	const [ loggedUser ] = useLocalStorage(STORAGE_KEYS.LOGGED_USER, '');

	return (
		<h1>Welcome back, {loggedUser}!</h1>
	)
};
