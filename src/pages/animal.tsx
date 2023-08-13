import { FC } from "react";
import { useParams } from "react-router-dom";

export const AnimalPage: FC = () => {
	const params = useParams();

	return <h1>{params.animal}</h1>;
};
