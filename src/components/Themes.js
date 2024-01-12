import Image from "next/image";

import DevtreeDemo from "../../public/devtree_gif.gif";

const Themes = () => {
  return (
    <>
      <div>
        <h1 className="text-white text-[2rem] p-2 py-4 font-semibold">
          Themes
        </h1>
      </div>
      <div className="border-[3px] shadow-neurobrutalism_black rounded-md">
        <Image
          src={DevtreeDemo}
          width={800}
          height={550}
          alt="Devtree theme demo"
          className="rounded-sm"
        />
      </div>
    </>
  );
};

export default Themes;
