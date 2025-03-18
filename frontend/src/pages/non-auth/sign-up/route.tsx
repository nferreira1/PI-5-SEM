import { Link } from "react-router";
import Form from "./components/form";

export default function SignUp() {
	return (
		<main className="mx-auto flex max-w-screen-sm grow flex-col items-center justify-center p-2 sm:p-0">
			<Form />

			<p className="mt-2 text-center text-sm">
				Já possuí cadastro?{" "}
				<Link
					to="/sign-in"
					className="text-primary font-semibold underline"
				>
					Fazer login.
				</Link>
			</p>
		</main>
	);
}
