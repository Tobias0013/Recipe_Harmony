import React, { useEffect, useState } from "react";

import fetchAssignments from "../controller/fetchAssignments";

type assignment = {
    employeeId: Number;
    employeeName: String;
    projectName: String;
    startDate: Date;
};

export default function Table() {
    const [assignments, setAssignments] = useState<[assignment]>();

    const updateAssignments = async () => {
        return setAssignments(await fetchAssignments());
    };

    useEffect(() => {
        updateAssignments();
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            updateAssignments();
        }, 60000);
    });

    return (
        assignments && (
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee_ID</th>
                        <th>Employee_name</th>
                        <th>Project_name</th>
                        <th>Start_date</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <TableRow
                            key={crypto.randomUUID()}
                            assignment={assignment}
                        />
                    ))}
                </tbody>
            </table>
        )
    );
}

function TableRow(props: { assignment: assignment }) {
    return (
        <tr>
            <TableData data={props.assignment.employeeId.toString()} />
            <TableData data={props.assignment.employeeName} />
            <TableData data={props.assignment.projectName} />
            <TableData data={props.assignment.startDate.toLocaleDateString()} />
        </tr>
    );
}

function TableData(props: { data: String }) {
    return <td>{props.data}</td>;
}
