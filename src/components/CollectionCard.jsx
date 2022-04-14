import { Link } from "react-router-dom";

import "./CollectionCard.css";

const CollectionCard = (props) => {
  return (
    <Link
      to={`/collections/${props.collection_address}`}
      className="collection-card-link"
    >
      <div className="collection-card">
        <div
          className="collection-card-image"
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
        <div className="collection-card-name">{props.name}</div>
      </div>
    </Link>
  );
};

export default CollectionCard;
