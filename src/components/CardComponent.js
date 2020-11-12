import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
class CardComponent extends React.Component {
  render() {
    const {
      handleChange,
      cardInfo: { fliped, content, id, win }
    } = this.props;

    return (
      <div className="card">
        <Flippy
          className="flippyContainer"
          style={{ display: "block", width: "83px", height: "140px" }}
          flipOnClick={true} // default false
          isFlipped={fliped}
        >
          <FrontSide
            onClick={handleChange.bind(null, id)}
            className="containerFrontSide"
          >
            <img
              className="backCardImage"
              alt="img"
              src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/7b7afb22566939.56314d69855ab.jpg"
            />
          </FrontSide>
          <BackSide
            className="containerFlipImage"
            style={{ backgroundColor: win ? "#bfad11" : "#175852" }}
          >
            {win && <div className="winFlipImage" />}
            <img className="flipImage" alt="img" src={content} />
          </BackSide>
        </Flippy>
      </div>
    );
  }
}

export default CardComponent;
