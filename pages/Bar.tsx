import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export default function Bar() {

	const router = useRouter()
	
	useEffect(() => {
		console.log(router);
		
	})
	return (
		<div>Bar</div>
	);
}
