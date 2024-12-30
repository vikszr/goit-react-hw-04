import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loader}>
      <ThreeDots color="#3f51b5" height={60} width={60} />
    </div>
  );
}
