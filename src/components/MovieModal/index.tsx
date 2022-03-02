import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap"

import { MovieDetail } from "../../config"

import close from "../../assets/images/close.svg";

type MovieModalProps = {
    movie: MovieDetail | null,
    selectMovie(movie: MovieDetail | null): any;
}

const MovieModal: FunctionComponent<MovieModalProps> = ({ movie, selectMovie }) => {
    return movie && (
        <Modal
            show={movie ? true : false}
            onHide={() => {
                window.history.pushState(null, "", `${window.location.pathname}`);
                selectMovie(null)
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="movie-modalbody">
                <div
                    className="close-btn"
                    onClick={() => {
                        window.history.pushState(null, "", `${window.location.pathname}`);
                        selectMovie(null)
                    }}
                >
                    <img src={close} alt="close" />
                </div>
                <h1 className="movie-title">{movie.title}</h1>
                <span className="subject">
                    Year
                </span>
                <p className="description">
                    {movie.year}
                </p>
                <span className="subject">
                    Genre
                </span>
                <p className="description">
                    {movie.genre}
                </p>
                <span className="subject">
                    Description
                </span>
                <p className="description">
                    {movie.description}
                </p>

                <div className="d-flex">
                    <span className="subject" style={{ marginRight: 48 }}>
                        Director
                        <p className="link">
                            {movie.director}
                        </p>
                    </span>
                    <span className="subject">
                        Actors
                        <p className="link">
                            {movie.actors}
                        </p>
                    </span>
                </div>


                <span className="subject">
                    Runtime
                </span>
                <p className="description">
                    {movie.runtime} mins
                </p>
                <span className="subject">
                    Rating
                </span>
                <p className="description">
                    {movie.rating}
                </p>
                <span className="subject">
                    Votes
                </span>
                <p className="description">
                    {movie.votes}
                </p>
                <span className="subject">
                    Revenue
                </span>
                <p className="description">
                    {movie.revenue && "$"}{movie.revenue ? movie.revenue.toFixed(2) : "-"}
                </p>
                <span className="subject">
                    Metascore
                </span>
                <p className="description">
                    {movie.metascore}
                </p>
            </Modal.Body>
        </Modal>
    )
}

export default MovieModal