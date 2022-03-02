import { FunctionComponent } from "react";

import { Movie } from "../../config"

import eye from "../../assets/images/eye.svg";

type TableRowProps = {
    movie: Movie,
    fetchMovie(id: string): any;
}

const TableRow: FunctionComponent<TableRowProps> = ({ movie, fetchMovie }) => {
    return (
        <tr>
            <td className="text-center table-row">{movie.rank}</td>
            <td className="table-row">{movie.title}</td>
            <td className="table-row">{movie.year}</td>
            <td className="table-row">{movie.revenue && "$"} {movie.revenue ? movie.revenue.toFixed(2) : "-"}</td>
            <td className="table-row svg-btn" onClick={() => fetchMovie(movie.id)}>
                <img src={eye} alt="eye" />
            </td>
        </tr>
    )
}

export default TableRow