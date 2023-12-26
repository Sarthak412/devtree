import { useFormStatus } from "react-dom";

export default function SubmitBtn({ children, className }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-black w-full text-white disabled:bg-purple-400 disabled:text-white px-4 py-2.5 flex mx-auto items-center justify-center gap-2 rounded-md hover:bg-purple-800 transition-all duration-300 ${className}`}
    >
      {pending ? <span>Saving...</span> : children}
    </button>
  );
}
