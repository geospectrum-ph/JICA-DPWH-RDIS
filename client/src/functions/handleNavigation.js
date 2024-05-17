import { useNavigate } from "react-router-dom";

export default function handleNavigation(module) {
	localStorage.setItem("active_module", module);

	const navigate = useNavigate();

	switch (module) {
    case "Sign In":
			// navigate("/sign-in");
			break;
    case "Change Password":
			// navigate("/change-password");
			break;
    case "Home":
			// navigate("/home");
			break;
    case "Data":
			// navigate("/data");
			break;
    case "Analytics":
			// navigate("/analytics");
			break;
    case "Account":
			// navigate("/account");
			break;
    case "Support":
			// navigate("/support");
			break;
    case "Exit":
			localStorage.clear();
			// navigate("/");
    	break;
    default:
    	return null;
	}  

  console.log("test");

	return null; 
}