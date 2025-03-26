import { useRoutes } from "react-router";
import { _routes } from "./router";

export { Root };

function Root() {

	const element = useRoutes(_routes);

	return (
		<div className="app-container">
			{element}
		</div>
	);
}
