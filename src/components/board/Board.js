import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'

//TODO: refactor the boardTiles and boardPieces arrays to be two dimensional

class Board extends React.Component {
    boardTiles = [[],[],[],[],[],[],[],[]];

    boardPieces = [];
    highlightedTiles= [];
    state = {
        userColor: 'white',
        userActionSelect : 'piece',
        pieceSelected: null,
        currentTile : null,
        x: null,
        y: null
    }
    pieces = ['pawn','knight','bishop','queen','king','rook'];

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
                        type: null,
                        color: null
                        // get color() {
                        //     return (this.type === null ? null : 'white');
                        // }
                    }
                }
                this.boardTiles[i].push(tileObject);
            }

        //test pieces
        this.boardTiles[4][4].piece = {type: 'rook', color: 'white'};
        this.boardTiles[2][1].piece = {type: 'bishop', color: 'white'};
        this.boardTiles[5][5].piece = {type: 'rook', color: 'white'};
        this.boardTiles[5][6].piece = {type: 'pawn', color: 'white'};
        this.boardTiles[4][1].piece = {type: 'pawn', color: 'black'};

    }

    boardClickHandler = (tile) => {

        if(this.state.userActionSelect === 'piece'){
            if(tile.piece.color !== this.state.userColor)
                return;
            if(tile.piece.type)
                if(this.setMovableTiles(tile) === 0)
                    return;

            this.setState({ pieceSelectedType: tile.piece.type});   //passing the whole object causes it to be reference notprimitve, breaking the movement
            this.setState({ currentTile: tile})
            console.log(tile)
        }
        else {
            if((tile.x !== this.state.currentTile.x || tile.y !== this.state.currentTile.y) && tile.isMovable){
                this.boardTiles[tile.y][tile.x].piece.type = this.state.pieceSelectedType;
                this.boardTiles[tile.y][tile.x].piece.color = this.state.userColor;
                // this.boardTiles[tile.y][tile.x].piece.type = this.pieces[(Math.ceil(Math.random() * (this.pieces.length - 1)))]
                this.boardTiles[this.state.currentTile.y][this.state.currentTile.x].piece.type = null //since state.curtile is this tile, noning it will none all of it
                this.boardTiles[this.state.currentTile.y][this.state.currentTile.x].piece.color = null
            }
            this.boardTiles.forEach(element => {
                element.forEach(tile => {
                    tile.isMovable = false;
                })
            });
        }

        this.setState({ userActionSelect: this.state.userActionSelect === 'piece' ? 'tile' : "piece"});
    }

    // checkIfTileMovable(tile, curTile){
    //     if(tile.piece.color == curTile.piece.color)
    // }
    //
    setMovableAndUpCount

    setMovableTiles = (tile) => {
        let curTile;
        let tileCount = 0;

        function setMovableAndUpCount(tile){
            tileCount++;
            tile.isMovable = true;
        }

        switch(tile.piece.type) {
            case 'pawn':
                let yChange = -1;

                if(tile.piece.color === 'white')
                    yChange = -1;
                else
                    yChange = 1;

                // this.boardTiles[tile.y + yChange][tile.x].isMovable = this.boardTiles[tile.y + yChange][tile.x] != null :
                if(tile.y + yChange >= 0 && tile.y + yChange <= 7){
                    curTile = this.boardTiles[tile.y + yChange][tile.x];
                    console.log(curTile.piece.type)
                    if(curTile.piece.type == null)
                        setMovableAndUpCount(curTile)
                }

                if(tile.y + yChange >= 0 && tile.y + yChange <= 7){
                    curTile = this.boardTiles[tile.y + yChange][tile.x - 1]
                    if(curTile.piece.type != null && curTile.piece.color != tile.piece.color)
                        setMovableAndUpCount(curTile);
                }

                if(tile.y + yChange >= 0 && tile.y + yChange <= 7){
                    curTile = this.boardTiles[tile.y + yChange][tile.x + 1]
                    if(curTile.piece.type != null && curTile.piece.color != tile.piece.color)
                        setMovableAndUpCount(curTile);
                }

                break;
            case 'bishop':
                for(let i = 1; tile.y - i >= 0 && tile.x - i >= 0; i++){
                    curTile = this.boardTiles[tile.y - i][tile.x - i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.y - i >= 0 && tile.x + i <= 7; i++){
                    curTile = this.boardTiles[tile.y - i][tile.x + i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.y + i <= 7 && tile.x + i <= 7; i++){
                    curTile = this.boardTiles[tile.y + i][tile.x + i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.y + i <= 7 && tile.x - i >= 0; i++){
                    curTile = this.boardTiles[tile.y + i][tile.x - i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                break;
            case 'knight':
                break;
            case 'rook':
                for(let i = 1; tile.y - i >= 0 && tile.y - i <= 7; i++){
                    curTile = this.boardTiles[tile.y - i][tile.x];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.y + i >= 0 && tile.y + i <= 7; i++){
                    curTile = this.boardTiles[tile.y + i][tile.x];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.x - i >= 0 && tile.x - i <= 7; i++){
                    curTile = this.boardTiles[tile.y][tile.x - i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                for(let i = 1; tile.x + i >= 0 && tile.x + i <= 7; i++){
                    curTile = this.boardTiles[tile.y][tile.x + i];
                    if(curTile.piece.color === "white")
                        break;
                    setMovableAndUpCount(curTile);
                    if(curTile.piece.color === "black")
                        break;
                }
                break;
            case 'queen':
                break;
            case 'king':
                //TODO: clean this, fix y index -1 bug
                if(tile.y + 1 >=0 && tile.y + 1 <= 7)
                    if((curTile = this.boardTiles[tile.y + 1][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y + 1 >=0 && tile.y + 1 <= 7)
                    if((curTile = this.boardTiles[tile.y + 1][tile.x + 0]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y + 1 >=0 && tile.y + 1 <= 7)
                    if((curTile = this.boardTiles[tile.y + 1][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y + 0 >=0 && tile.y + 0 <= 7)
                    if((curTile = this.boardTiles[tile.y + 0][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y - 1 >=0 && tile.y - 1 <= 7)
                    if((curTile = this.boardTiles[tile.y - 1][tile.x - 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y - 1 >=0 && tile.y - 1 <= 7)
                    if((curTile = this.boardTiles[tile.y - 1][tile.x + 0]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y - 1 >=0 && tile.y - 1 <= 7)
                    if((curTile = this.boardTiles[tile.y - 1][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                if(tile.y + 0 >=0 && tile.y + 0 <= 7)
                    if((curTile = this.boardTiles[tile.y + 0][tile.x + 1]) !== undefined && curTile.piece.color !== tile.piece.color)
                        setMovableAndUpCount(curTile);
                break;
            default:
                break;
        }

        console.log(tileCount);
        return tileCount;
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
