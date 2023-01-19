import { TbError404 } from "react-icons/tb";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div>			
			<ErrorMessage icon={TbError404}>
				The <b>page</b> you tried reaching <b>does not exist.</b>
				<br />
				<button onClick={() => navigate(-1)}>Click here</button> to go back.
			</ErrorMessage>
		</div>
	);
}
