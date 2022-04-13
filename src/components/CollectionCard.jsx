import { Link } from "react-router-dom";
const CollectionCard = (props) => {
  return (
    <Link to={`/collections/${props.collection_address}`}>
      <h2>{props.name}</h2>
    </Link>
  );
};

export default CollectionCard;
