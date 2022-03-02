import { FunctionComponent } from "react";

import Dropdown from "react-bootstrap/Dropdown";

type DropdownSelectProps = {
    label: string,
    year: string | null,
    actions: Array<string>,
    setYear(year: string): any;
    setPage(page: number): any;
}

const DropdownSelect: FunctionComponent<DropdownSelectProps> = ({ label, actions, year, setYear, setPage }) => {
    // const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Dropdown className="filter-dropdown" align="start" drop="end">
                <Dropdown.Toggle id={label} active={year !== null}>
                    {label}
                </Dropdown.Toggle>
                {actions.length > 0 && (
                    <Dropdown.Menu>
                        <li><span className="dropdown-title">Select a year</span></li>
                        {actions.map((el: any) => (
                            <Dropdown.Item
                                key={el}
                                active={year === el}
                                onClick={() => {
                                    setYear(el);
                                    setPage(0);
                                }}
                            >
                                {el}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                )}
            </Dropdown>
            {/* ADD BACKGROUND FADE WHEN DROPDOWN OPEN */}
            {/* {open && (
                <div className="fade modal-backdrop show"></div>
            )} */}
        </>
    )
}

export default DropdownSelect