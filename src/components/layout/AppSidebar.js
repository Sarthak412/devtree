"use client";

import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";

import { faFileLines } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="mt-12 space-y-4 text-gray-700">
      <Link
        href={"/account"}
        className={
          "flex gap-4 p-1 " +
          (pathname === "/account" ? "text-purple-600 font-semibold" : "")
        }
      >
        <FontAwesomeIcon
          icon={faFileLines}
          fixedWidth={true}
          className={"w-6 h-6"}
        />
        <span>My Page</span>
      </Link>
      <Link
        href={"/analytics"}
        className={
          "flex gap-4 p-1 " +
          (pathname === "/analytics" ? "text-purple-600 font-semibold" : "")
        }
      >
        <FontAwesomeIcon
          icon={faChartLine}
          fixedWidth={true}
          className={"w-6 h-6"}
        />
        <span>Analytics</span>
      </Link>
      <Link href={"/"} className="flex gap-4 p-1">
        <FontAwesomeIcon
          icon={faArrowLeft}
          fixedWidth={true}
          className={"w-6 h-6"}
        />
        <span className="text-gray-600">Back to Home</span>
      </Link>
    </nav>
  );
}
