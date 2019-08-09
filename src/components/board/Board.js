import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'
import { arrayExpression } from '@babel/types';

//TODO: refactor the boardTiles and boardPieces arrays to be two dimensional

class Board extends React.Component {
    boardTiles = [];
    boardPieces = [];
    boardTilesElements=[];
    highlightedTiles= [];
    state = {
        userActionSelect : 'piece',
        pieceSelectedType: null
    }
    pieces = ['pawn','knight','bishop','queen','king','rook', 'none', 'none', 'none', 'none', 'none', 'none'];

    getBoardPiece(x,y){
        return this.boardPieces[x + y*8];
    }

    constructor(){
        super();

        //TODO: refactor this, kinda messy
        for(let i = 0; i < 8; i++)
            for(let j = 0 ; j < 8; j++){
                this.boardTiles.push(((i*8)+j) + (((i%2===0) ? 0 : 1)))
                this.boardPieces[i*8 + j] = this.pieces[(Math.ceil(Math.random() * (this.pieces.length - 1)))]
            }
    }

    boardClickHandler = (pieceType, row, col) => {
        // console.log("column(x): " + col);
        // console.log("row(y): " + row);
        this.setState({ userActionSelect: this.state.userActionSelect === 'piece' ? 'tile' : "piece"});
        this.setState({ pieceSelectedType: pieceType});
        if(pieceType)
            this.setHighlightedTiles(pieceType, col, row)
    }

    //runs on every click of a piece
    setHighlightedTiles = (piece, col_base, row_base) => {
        console.log(piece);
        console.log(col_base);
        console.log(row_base);

        //reset highlightedTiles
        this.highlightedTiles = [];

        switch(piece) {
            case "pawn":
                break;
            case "bishop":
                //TODO: Refactor this code into modularized functions
                for(let boundCount = 0; boundCount < 4; boundCount++){
                    switch(boundCount) {
                        //TODO ENUM THESE
                        case 0: //upleft -col - row
                            for(let i = 1; col_base - i >= 0 && row_base - i >= 0; i++){
                                if(this.boardPieces[(col_base - i) + (row_base - i) * 8] !== 'none'){
                                    this.highlightedTiles.push({x: col_base - i, y: row_base - i})
                                    break;
                                }
                                else
                                    this.highlightedTiles.push({x: col_base - i, y: row_base - i})
                            }
                            break;
                        case 1: // upright
                            for(let i = 1; col_base + i <= 7 && row_base - i >= 0; i++){
                                if(this.boardPieces[(col_base + i) + (row_base - i) * 8] !== 'none'){
                                    this.highlightedTiles.push({x: col_base + i, y: row_base - i})
                                    break;
                                }
                                else
                                    this.highlightedTiles.push({x: col_base + i, y: row_base - i})
                            }
                            break;
                        case 2: //downright
                            for(let i = 1; col_base + i <= 7 && row_base + i <= 7; i++){
                                if(this.boardPieces[(col_base + i) + (row_base + i) * 8] !== 'none'){
                                    this.highlightedTiles.push({x: col_base + i, y: row_base + i})
                                    break;
                                }
                                else
                                    this.highlightedTiles.push({x: col_base + i, y: row_base + i})
                            }
                            break;
                        case 3: //downleft
                            for(let i = 1; col_base - i >= 0 && row_base + i <= 7; i++){
                                if(this.boardPieces[(col_base - i) + (row_base + i) * 8] !== 'none'){
                                    this.highlightedTiles.push({x: col_base - i, y: row_base + i})
                                    break;
                                }
                                else
                                    this.highlightedTiles.push({x: col_base - i, y: row_base + i})
                            }
                            break;
                        default:
                    }
                }
                break;
            case "knight":
                //TODO: knight movement is messy

                for(let count = 0; count < 8 ; count++){

                }
                console.log(this.getBoardPiece(col_base,row_base))
                if(col_base >= 2)
                if(col_base <= 5){

                }
                if(row_base >= 2)
                if(row_base <= 5){
                    if(this.getBoardPiece(col_base + 2, row_base - 1))
                        this.highlightedTiles.push({x: col_base + 2, y: row_base - 1})
                    if(this.getBoardPiece(col_base + 2, row_base + 1))
                        this.highlightedTiles.push({x: col_base + 2, y: row_base + 1})
                }

                break;
            case "rook":
                break;
            case "queen":
                break;
            case "king":
                break;
            default:
        }

        // console.log(this.boardTilesElements);
        this.forceUpdate();
    }

    getIfTileIsHighlighted = (i) => {
        let result = false;
        this.highlightedTiles.forEach(tile => {
            if(i === (tile.x + (tile.y * 8))){
                //console.log(i + " = " + tile.x + " + " + (tile.y * 8))
                // console.log("TRUE")
                result = true;
            }
        });
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
                            piece={this.boardPieces[i]}
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
