import React from 'react';
import '../piece/Piece.css'

const Piece = (props) => {
    // console.log(prop s)
    return(
        <div className={props.piece.type + ' ' + (props.whatToHover==="piece" ? "hoverable": "")} >
            {
                props.piece.type ==='none' ? null : <img src={require("../../resources/images/" + props.piece.color + props.piece.type + ".png")}
                alt="knight-piece"
                width="75px"
                zindex='100'
                onClick={() => {
                    if(props.whatToHover === "piece"){
                        props.pieceClickFunction(props.piece, props.row, props.col)
                    }
                }}
                //onClick={props.whatToHover==='piece' ? props.pieceClickFunction(props.piece) : null}
                ></img>
            }
        </div>
    );
}

export default Piece;