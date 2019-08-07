import React from 'react';
import '../piece/Piece.css'

const Piece = (props) => {
    return(
        <div className={props.piece + ' ' + (props.whatToHover==="piece" ? "hoverable": "")} >
            {
                props.piece==='none' ? null : <img src={require("H:/Users/voltr/Desktop/onslaught-chess/src/resources/images/black"+ props.piece + ".png")} alt="knight-piece" width="75px"></img>
            }
        </div>
    );
}

export default Piece;