import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <p className={css.error}>
      Whoops! Something went wrong! Please try again later.
    </p>
  );
}
