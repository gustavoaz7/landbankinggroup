import { ChangeEvent, FC, FormEventHandler, useCallback, useState } from "react"
import { Button } from "./Button";

type TProps = {
	onSubmit: (name: string) => unknown;
	loading: boolean;
}

export const AnimalSearch: FC<TProps> = ({ onSubmit, loading }) => {
	const [value, setValue] = useState('');
	const handleSearch = useCallback<FormEventHandler>(async (e) => {
		e.preventDefault();
		onSubmit(value);
	}, [value, onSubmit]);

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
	) => setValue(event.target.value);

	return (
		<form className="flex flex-row gap-2 mt-2" onSubmit={handleSearch}>
			<input
				className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1
					ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset
					focus:ring-indigo-600 sm:text-sm sm:leading-6"
				value={value}
				onChange={handleInputChange}
			/>
			<Button type="submit" disabled={loading} className={loading ? 'bg-indigo-500' : ''}>
				{loading ? '🔄' : '🔍'}
			</Button>
		</form>
	);
};
