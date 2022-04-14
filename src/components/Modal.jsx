import "./Modal.css";

const Modal = (props) => {
  return (
    <div className="modal-container" onClick={() => props.onCloseModal()}>
      <div className="modal">
        <div
          className="modal-img"
          style={{ backgroundImage: `url(${props.token.image})` }}
        ></div>
        <div className="modal-details">
          <div className="modal-title">{props.token.name}</div>
          <div className="modal-rarity">
            <div className="modal-rank">💎 Rank {props.token.rarity_rank}</div>
            <div className="modal-score">
              ({props.token.rarity_score} Points)
            </div>
          </div>
          <div className="modal-divider"></div>
          <div className="modal-attributes">
            {props.token.attributes.map((trait) => (
              <div className="modal-trait-card">
                <div className="modal-trait-name">{trait.trait_type}</div>
                <div className="modal-trait-value">
                  {trait.value !== "None" ? trait.value : "🚫"}
                </div>
                <div className="modal-trait-score">{trait.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
