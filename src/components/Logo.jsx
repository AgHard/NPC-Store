import { Link } from "react-router-dom";
import { logoImg } from "../utils";
export default function Logo() {
  return (
    <Link
          to="/"
          className="flex items-center gap-2 bg-[#111] px-3 py-1 rounded-full shadow-sm"
        >
          <img src={logoImg} alt="Logo" width={40} height={40} />
        </Link>
  );
}
