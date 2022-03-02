import { useEffect, useState } from "react";
import axios from "axios";

import { Table, Button } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";

import { Header, DropdownSelect, TableHead, TableRow, MovieModal } from "./components";

import { Movie, MovieDetail } from "./config";

import reload from "./assets/images/reload.svg"

import { getWithFilters } from "./api";

const years = [
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
    "2007",
    "2006",
    "2005",
    "2004",
    "2003",
    "2002",
    "2001",
    "2000"
]

function App() {
    const [results, setResults] = useState<any>(null); //* TODO Define

    const [loading, setLoading] = useState<boolean>(true);
    const [apiError, setApiError] = useState<boolean>(false);

    const [page, setPage] = useState<number>(0); //eslint-disable-line
    const [size, setSize] = useState<number>(10);

    const [year, setYear] = useState<string | null>(null);

    const [selectedMovie, selectMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        //! IF LINK HAS MOVIE ID OPEN MOVIE PROFILE
        const url_string = (window.location.href).toLowerCase();
        let url = new URL(url_string);
        let movieId = url.searchParams.get("movieid");
        if (movieId) {
            fetchMovie(movieId)
        }

        getWithFilters({ pagination: { page, size }, filters: { start: year, end: year } })
            .then((results) => {
                setTimeout(() => {
                    setResults(results);
                    setLoading(false);
                }, 200); //* MINI LOADING EFFECT
            }).catch((errors) => {
                console.log(errors);
                setLoading(false);
                setApiError(true);
            });
    }, [page, size, year]);

    const fetchMovie = (movieId: string) => {
        axios.get(`https://movie-challenge-api-xpand.azurewebsites.net/api/movies/${movieId}`)
            .then((results) => {
                window.history.pushState(null, "", `${window.location.pathname}?movieid=${movieId}`);
                selectMovie(results.data);
            }).catch((errors) => {
                console.log(errors)
            });
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="main-title">Movie ranking</h1>
                        <div className="d-flex">
                            <div>
                                <Button
                                    active={year === null}
                                    className="filter-button"
                                    onClick={() => {
                                        setYear(null)
                                        setSize(10)
                                    }}
                                >
                                    Top 10 Revenue
                                </Button>
                            </div>
                            <DropdownSelect label="Top 10 Revenue per Year" actions={years} year={year} setYear={setYear} setSize={setSize} />
                            {year && (
                                <div
                                    style={{ marginLeft: 10, marginTop: 2.5 }}
                                    className="svg-btn"
                                    onClick={() => {
                                        setYear(null)
                                        setSize(10)
                                    }}
                                >
                                    <img src={reload} alt="reload" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <InfiniteScroll
                            dataLength={results && results.content.length}
                            next={() => {
                                setSize(size + 10)
                            }}
                            hasMore={size < 1000}
                            height={600}
                            loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el: number) => (
                                <Table key={el} style={{ marginBottom: 0 }}>
                                    <tbody>
                                        <tr key={el} className="skeleton">
                                            <td className="table-row-skeleton"></td>
                                            <td className="table-row-skeleton"></td>
                                            <td className="table-row-skeleton"></td>
                                            <td className="table-row-skeleton"></td>
                                            <td className="table-row-skeleton"></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            ))}
                        >
                            <Table style={{ marginBottom: 0 }}>
                                <TableHead columns={["RANKING", "TITLE", "YEAR", "REVENUE", ""]} />
                                <tbody style={{ height: 600 }}>
                                    {loading && !apiError ? (
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el: number) => (
                                            <tr key={el} className="skeleton">
                                                <td className="table-row-skeleton"></td>
                                                <td className="table-row-skeleton"></td>
                                                <td className="table-row-skeleton"></td>
                                                <td className="table-row-skeleton"></td>
                                                <td className="table-row-skeleton"></td>
                                            </tr>
                                        ))
                                    ) : !loading && !apiError ? (
                                        results.content.map((movie: Movie) => (
                                            <TableRow key={movie.id} movie={movie} fetchMovie={fetchMovie} />
                                        ))
                                    ) : apiError && (
                                        <h1>API ERROR</h1>
                                    )}
                                </tbody>
                            </Table>
                        </InfiniteScroll>
                    </div>
                </div>
                <MovieModal movie={selectedMovie} selectMovie={selectMovie} />
            </div>
        </>
    );
}

export default App;
