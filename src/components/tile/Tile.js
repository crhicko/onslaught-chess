import React from 'react';
import '../tile/Tile.css';
import Piece from '../piece/Piece'

const Tile = (props) => {
    // classes = {
    //     "tile":true,
    //     (props.whatToHover==="piece" ? "hoverable": ""): true
    // }
    var styles = {
        backgroundColor: 'blue',
        zIndex: 15,
        width: '125px',
        height: '125px',
        position: 'absolute',
        opacity: 0.5
    }

    return(
        <div className={"tile" + " " + (props.whatToHover==="tile" ? "hoverable": "")} style={{backgroundColor: props.tileColor}}
            onClick={
                props.whatToHover==='tile' ? props.pieceClickFunction : null
            }>

            {
                props.isHighlighted ? <div style={styles}></div> : null
            }

            <Piece
                row={props.row}
                col={props.col}
                piece={props.piece}
                whatToHover={props.whatToHover}
                pieceClickFunction={props.pieceClickFunction}
            ></Piece>
        </div>
    )
};
export default Tile;