import "./NFTCard.css";
import { imglink } from "./imglink";

const NFTCard = (props) => {
  return (
    <div className="nft-card" onClick={() => props.onOpenModal(props.token)}>
      {props.meta["image"].includes(".mp4") ? (
        <div className="nft-video-container">
          <video className="nft-video" autoPlay loop muted>
            <source src={props.meta["image"]} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div
          className="nft-img"
          style={{ backgroundImage: `url(${imglink(props.meta["image"])})` }}
        ></div>
      )}

      <div className="nft-card-info">
        <div className="nft-tokenid"># {props.meta["_id"]}</div>
        <div className="nft-rank">💎 {props.meta["rarity_rank"]}</div>
        <div className="nft-estimate">
          Estimate:
          <br />Ξ {props.meta.estimate.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
