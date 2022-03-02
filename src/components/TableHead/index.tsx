import { FunctionComponent } from "react";

type TableHeadProps = {
    columns: Array<string>,
}

const TableHead: FunctionComponent<TableHeadProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((col, index) => index === 0 ? (
                    <th key={col} className="column text-center" scope="col">{col}</th>
                ) : (
                    <th key={col} className="column" scope="col">{col}</th>
                ))}
            </tr>
        </thead>
    )
}

export default TableHead