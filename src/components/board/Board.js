import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'

class Board extends React.Component {
    boardTiles = [];


    render() {
        for(let i = 0; i < 8; i++)
            for(let j = 0 ; j < 8; j++)
                this.boardTiles.push(((i*8)+j) + (((i%2===0) ? 0 : 1)))
        console.log(this.boardTiles);

        return(
            <div class="wrapper center">
                {
                    // for(i = 0; i < tileNum; i++)
                    //     <Tile gridx={i} color={((i%2)==0) ? "white" : "black"}></Tile>

                    // this.boardTiles
                    this.boardTiles.map((num,i) => (
                        <Tile gridx={i} color={((num%2)===0) ? "white" : "grey"}></Tile>
                        // <p>{item}</p>
                    ))
                }
            </div>
        );
    }
};

export default Board;
