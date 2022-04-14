import "./NFTCard.css";

const NFTCard = (props) => {
  return (
    <div className="nft-card" onClick={() => props.onOpenModal(props.token)}>
      <div
        className="nft-img"
        style={{ backgroundImage: `url(${props.meta["image"]})` }}
      ></div>
      <div className="nft-card-info">
        <div className="nft-tokenid"># {props.meta["_id"]}</div>
        <div className="nft-rank">💎 {props.meta["rarity_rank"]}</div>
        <div className="nft-estimate">
          Estimate:
          <br />Ξ {props.estimate.estimate.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
