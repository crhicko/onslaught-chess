import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'
import { arrayExpression } from '@babel/types';
import { type } from 'os';

//TODO: refactor the boardTiles and boardPieces arrays to be two dimensional

class Board extends React.Component {
    boardTiles = [[],[],[],[],[],[],[],[]];

    boardPieces = [];
    highlightedTiles= [];
    state = {
        userActionSelect : 'piece',
        pieceSelected: null,
        currentTile : null,
        x: null,
        y: null
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
                let tileObject = {
                    color: (j%2)===0 ? (i%2===0 ? "white" : "grey") : (i%2===0 ? "grey" : "white"),
                    x: j,
                    y: i,
                    isMovable: false,
                    piece: {
                        //type: this.pieces[(Math.ceil(Math.random() * (this.pieces.length - 1)))],
                        type: (i == 4 && j == 4) ? 'king' : 'none',
                        get color() {
                            return (this.type === 'none' ? null : 'white');
                        }
                    }
                }
                this.boardTiles[i].push(tileObject);
            }
    }

    boardClickHandler = (tile) => {
        this.setState({ userActionSelect: this.state.userActionSelect === 'piece' ? 'tile' : "piece"});
        if(this.state.userActionSelect === 'piece'){
            this.setState({ pieceSelectedType: tile.piece.type});   //passing the whole object causes it to be reference notprimitve, breaking the movement
            this.setState({ currentTile: tile})
            console.log(tile)
            if(tile.piece.type)
                this.setMovableTiles(tile)
        }
        else {
            this.boardTiles[tile.y][tile.x].piece.type = this.state.pieceSelectedType;
            this.boardTiles[this.state.currentTile.y][this.state.currentTile.x].piece.type = 'none' //since state.curtile is this tile, noning it will none all of it
            this.boardTiles.forEach(element => {
                element.forEach(tile => {
                    tile.isMovable = false;
                })
            });
        }
    }

    //
    setMovableTiles = (tile) => {
        switch(tile.piece.type) {
            case 'pawn':
                break;
            case 'bishop':
                break;
            case 'knight':
                break;
            case 'queen':
                break;
            case 'king':
                //TODO: clean this, fix y index -1 bug
                let curTile
                if((curTile = this.boardTiles[tile.y + 1][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y + 1][tile.x + 0]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y + 1][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y + 0][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y - 1][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y - 1][tile.x + 0]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y - 1][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;
                if((curTile = this.boardTiles[tile.y + 0][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                    curTile.isMovable = true;

                break;
            default:
                break;
        }
    }

    //runs on every click of a piece
    /*
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

        this.forceUpdate();
    }
    */

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
            // this.boardTiles.map( rows => {
            //     return rows.map((t,i) => console.log(t.piece))
            // })
        return(
            <div className="wrapper center">
                {
                    this.boardTiles.map( rows => {
                        return rows.map((t,i) => (
                            <Tile
                                tile={t}
                                whatToHover={this.state.userActionSelect}
                                pieceClickFunction={this.boardClickHandler}
                            ></Tile>
                        ))
                    })
                }
            </div>
        );
    }
};

export default Board;
