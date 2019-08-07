import React from 'react';
import '../tile/Tile.css';
import Piece from '../piece/Piece'

const Tile = (props) => {
    // classes = {
    //     "tile":true,
    //     (props.whatToHover==="piece" ? "hoverable": ""): true
    // }

    return(
        <div className={"tile" + " " + (props.whatToHover==="tile" ? "hoverable": "")} style={{backgroundColor: props.color}}
            onClick={props.whatToHover==='tile' ? props.pieceClickFunction : null}>

            <Piece
                piece={props.piece}
                whatToHover={props.whatToHover}
                pieceClickFunction={props.pieceClickFunction}
            ></Piece>
        </div>
    )
};
export default Tile;