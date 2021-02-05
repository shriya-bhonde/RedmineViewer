import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button } from "reactstrap";
import history from './history';
import { Link, useHistory } from 'react-router-dom';
import ViewDetails from './ViewDetails'
import './List.css';


const Axios = () => {

    const [issues, setIssues] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        axios.get('https://localhost:5001/redmine/Details').then(res => {
            const issues = res.data;
            setIssues(issues);
        });
    }, []);

    const history = useHistory();

    const filteredIssues = search.length === 0 ? issues :
        issues.filter(issue => issue.project.name.
            toLowerCase().includes(search.toLowerCase()))

    return (
        <div>

            <div>
                <input
                    type="text"
                    value={search}
                    placeholder="Search Project"

                    onChange={(e) => setSearch(e.target.value)}
                />

                <table className="padding-table-columns">
                    <thead>
                        <tr>
                            <th>Issue ID    </th>
                            <th>Project     </th>
                            <th>Tracker     </th>
                            <th>Status      </th>
                            <th>Subject     </th>
                            <th> Author     </th>
                            <th> Assignee    </th>
                        </tr>

                    </thead>

                    <tbody>
                        {filteredIssues.map(issue => (
                            <tr key={issue.id} >
                                <Link
                                    to={{
                                        pathname: "/ViewDetails",
                                        data1: issue.id,
                                        data2: issue.project.name,
                                        data3: issue.tracker.name,
                                        data4: issue.status.name,
                                        data5: issue.subject,
                                        data6: issue.priority.name,
                                        data7: issue.author.name,
                                        data14: (!!issue.assignedTo && !!issue.assignedTo.name) ? issue.assignedTo.name : '-',
                                        data8: issue.category,
                                        data9: issue.description,
                                        data10: issue.startDate,
                                        data11: issue.dueDate,
                                        data12: issue.createdOn,
                                        data13: issue.updatedOn,
                                        
                                    }
                                    }
                                >{issue.id} </Link>

                                <td>  {issue.project.name}  </td>
                                <td> {issue.tracker.name} </td>
                                <td> {issue.status.name}  </td>
                                <td>  {issue.subject}  </td>
                                <td> {issue.author.name}  </td>
                                <td>{(!!issue.assignedTo && !!issue.assignedTo.name) ? issue.assignedTo.name : '-'} </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

            </div>



        </div>
    );
}

export default Axios;