import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'

class Board extends React.Component {
    boardTiles = [];
    state = {
        turnActionMode : 'piece'
    }
    pieces = ['pawn','knight','bishop','queen','king','rook', 'none'];


    render() {
        for(let i = 0; i < 8; i++)
            for(let j = 0 ; j < 8; j++)
                this.boardTiles.push(((i*8)+j) + (((i%2===0) ? 0 : 1)))
        console.log(this.pieces[((Math.round(Math.random() * 6)))])

        return(
            <div className="wrapper center">
                {
                    // for(i = 0; i < tileNum; i++)
                    //     <Tile gridx={i} color={((i%2)==0) ? "white" : "black"}></Tile>

                    // this.boardTiles
                    this.boardTiles.map((num,i) => (
                        <Tile gridx={i} color={((num%2)===0) ? "white" : "grey"} piece={this.pieces[(Math.round(Math.random() * 6))]} whatToHover={this.state.turnActionMode}></Tile>
                        // <p>{item}</p>
                    ))
                }
            </div>

        );
    }
};

export default Board;
