import { Counter } from "../components/Counter";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export default function Home() {

	// console.log(import.meta.env.SSR);
	

	// const router = useRouter()
	
	// useEffect(() => {
	// 	console.log(router);
		
	// })
	return (
		<>
			<div>Hello from home page!</div>
			<Counter />
		</>
	);
}
