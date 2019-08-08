import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'
import { arrayExpression } from '@babel/types';

class Board extends React.Component {
    boardTiles = [];
    boardTilesElements=[];
    highlightedTiles= [
        {x:0,y:0},
        {x:0,y:1}
    ]
    state = {
        userActionSelect : 'piece',
        pieceSelectedType: null
    }
    pieces = ['pawn','knight','bishop','queen','king','rook', 'none', 'none', 'none', 'none', 'none', 'none'];

    constructor(){
        super();

        //TODO: refactor this, kinda messy
        for(let i = 0; i < 8; i++)
            for(let j = 0 ; j < 8; j++)
                this.boardTiles.push(((i*8)+j) + (((i%2===0) ? 0 : 1)))
    }

    boardClickHandler = (pieceType, row, col) => {
        // console.log("column(x): " + col);
        // console.log("row(y): " + row);
        this.setState({ userActionSelect: this.state.userActionSelect === 'piece' ? 'tile' : "piece"});
        this.setState({ pieceSelectedType: pieceType});
        if(pieceType)
            this.setHighlightedTiles(pieceType, col, row)
    }

    setHighlightedTiles = (piece, col_base, row_base) => {
        if(piece === "rook"){
            // for(let i=0; i<8; i++)

        }

        // console.log(this.boardTilesElements);
        this.forceUpdate();
    }

    getIfTileIsHighlighted = (i) => {
        console.log(i)
        let result = false;
        this.highlightedTiles.forEach(tile => {
            if(i === (tile.x + (tile.y * 8))){
                //console.log(i + " = " + tile.x + " + " + (tile.y * 8))
                // console.log("TRUE")
                result = true;
            }
        });
        // console.log(result)
        return result;
    }

    render() {
        return(
            <div className="wrapper center">
                {
                    this.boardTilesElements = this.boardTiles.map((num,i) => (
                        <Tile tileColor={
                                (((num%2)===0) ? "white" : "grey")
                            }
                            isHighlighted={this.getIfTileIsHighlighted(i) ? true : false}
                            row={Math.floor(i/8)}
                            col={i%8}
                            piece={this.pieces[(Math.ceil(Math.random() * (this.pieces.length - 1)))]}
                            whatToHover={this.state.userActionSelect}
                            pieceClickFunction={this.boardClickHandler}
                        ></Tile>
                    ))
                }
            </div>
        );
    }
};

export default Board;
