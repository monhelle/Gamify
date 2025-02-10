import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndividualGame() {
    const id = useParams().id;
    console.log(id);

    const [game, setGame] = useState();

    useEffect(() => {
        retrieveGame();
    }, [])

    function retrieveGame() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/games/${id}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setGame(response.data.game)
            })
    }

    return (
        <div>
            {game ? 
            <div key={game._id}>
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <p>{game.shortDescription}</p>
                <p>{game.price}</p>
                <p>{game.discount}</p>
                <p>{game.status}</p>
                <p>{game.developer}</p>
                <p>{game.releaseDate}</p>
                <p>{game.producer}</p>
                <p>{game.tags}</p>
                {game.reviews ? game.reviews.map((review) => {
                    return(
                        <div>{review}</div>
                    )
                }):<div></div>}
                <p>{game.img}</p>
            </div>
            : <div>Game not found</div>}
        </div>
    )
}