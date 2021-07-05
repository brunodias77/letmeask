import "../styles/button.scss";

export function Button({ isOutlined, content, ...rest }) {
  return (
    <button className={`button ${isOutlined ? "outlined" : " "}`} {...rest}>
      {content}
    </button>
  );
}
