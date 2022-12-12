const BoardItem = (props) => {
  return (
    <li>
      <figure>
        <div>
          <p>props.text</p>
        </div>
        <figcaption>props.userEmail</figcaption>
        <figcaption>props.date</figcaption>
      </figure>
    </li>
  );
};

export default BoardItem;
