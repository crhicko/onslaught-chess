import React from 'react';
import './Board.css';
import Tile from '../tile/Tile'

class Board extends React.Component {
    boardTiles = [];
    state = {
        userActionSelect : 'piece'
    }
    pieces = ['pawn','knight','bishop','queen','king','rook', 'none', 'none', 'none', 'none', 'none', 'none'];

    constructor(){
        super();
        console.log("new board")
        for(let i = 0; i < 8; i++)
            for(let j = 0 ; j < 8; j++)
                this.boardTiles.push(((i*8)+j) + (((i%2===0) ? 0 : 1)))
    }

    userActionSelectChange = (e) => {
        console.log("chnaging state")
        this.setState({ userActionSelect: this.state.userActionSelect === 'piece' ? 'tile' : "piece"});
    }

    render() {


        return(
            <div className="wrapper center">
                {
                    // for(i = 0; i < tileNum; i++)
                    //     <Tile gridx={i} color={((i%2)==0) ? "white" : "black"}></Tile>

                    // this.boardTiles
                    this.boardTiles.map((num,i) => (
                        <Tile color={((num%2)===0) ? "white" : "grey"}
                            piece={this.pieces[(Math.ceil(Math.random() * (this.pieces.length - 1)))]}
                            whatToHover={this.state.userActionSelect}
                            pieceClickFunction={this.userActionSelectChange}
                        ></Tile>
                        // <p>{item}</p>
                    ))
                }
            </div>

        );
    }
};

export default Board;
