import React from 'react';
import '../piece/Piece.css'

const Piece = (props) => {
    // console.log(prop s)
    return(
        <div className={props.tile.piece.type + ' ' + (props.whatToHover==="piece" ? "hoverable": "")} >
            {
                props.tile.piece.type === null ? null : <img src={require("../../resources/images/" + props.tile.piece.color + props.tile.piece.type + ".png")}
                alt="knight-piece"
                width="75px"
                zindex='100'
                onClick={() => {
                    if(props.whatToHover === "piece"){
                        props.pieceClickFunction(props.tile)
                    }
                }}
                //onClick={props.whatToHover==='piece' ? props.pieceClickFunction(props.piece) : null}
                ></img>
            }
        </div>
    );
}

export default Piece;