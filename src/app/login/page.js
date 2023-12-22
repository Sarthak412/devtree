import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import LoginWithGithub from "@/components/buttons/LoginWithGithub";

export default function page() {
  return (
    <div className="bg-white border border-gray-300 p-4 max-w-sm mx-auto rounded-md shadow">
      <div className="">
        <h1 className="text-2xl font-semibold text-center py-2 mb-4">
          Sign-in
        </h1>
        <p className="text-md mb-3 text-center text-gray-600">
          Login using a social account
        </p>
        <div className="space-y-2">
          {/* Google Login Component will come here */}
          <LoginWithGoogle />
          {/* Github Login Component will come here */}
          <LoginWithGithub />
        </div>
      </div>
    </div>
  );
}
