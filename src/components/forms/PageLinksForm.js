import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function PageLinksForm() {
  return (
    <SectionBox>
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faLink} className="h-5 text-purple-600" />
        <h1 className="font-semibold text-xl text-gray-500">Project Links</h1>
      </div>
    </SectionBox>
  );
}
