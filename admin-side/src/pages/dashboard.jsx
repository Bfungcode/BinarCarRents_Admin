import axios from 'axios';
import React, { useState } from 'react';
import { Input, Label, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const GetMyTable = () => {
    const data = [
        {
            id: 1,
            car: 'Mercedez Benz',
            user_email: 'wg@creative.org',
            start_rent: '2022-01-26',
            finish_rent: '2022-02-02',
            price: 500000,
            category: '4-6 orang'
        },
        {
            id: 2,
            car: 'Suzuki Xpander',
            user_email: 'jwalters@creative.org',
            start_rent: '2022-06-14',
            finish_rent: '2022-02-02',
            price: 500000,
            category: '4-6 orang'
        },
        {
            id: 3,
            car: 'Porsche',
            user_email: 'bbanner@creative.org',
            start_rent: '2012-06-20',
            finish_rent: '2022-02-02',
            price: 500000,
            category: '4-6 orang'
        }
        // ...
    ];

    const [tableData, setTableData] = useState(data);

    const columns = [
        { label: 'Car', field: 'car' },
        { label: 'User Email', field: 'user_email' },
        { label: 'Start Rent', field: 'start_rent' },
        { label: 'Finish Rent', field: 'finish_rent' },
        { label: 'Price', field: 'price' },
        { label: 'Category', field: 'category' }
    ];

    return (
        <>
            <Table hover bordered>
                <thead>
                    <tr style={{ backgroundColor: '#CFD4ED' }}>
                        {columns.map(column => {
                            return <th key={column.field}>{column.label}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data, i) => {
                        return (
                            <tr key={i}>
                                {columns.map((column, j) => {
                                    const value = data[column.field] || '-';
                                    return <td key={column.field + j}>{value}</td>;
                                })}
                            </tr>
                        );
                    })}

                    <tr>
                        <td>{/* ... */}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
};

const TablePagination = () => {
    console.log([...Array(10).keys()]);
    return (
        <Pagination>
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous href="#" />
            </PaginationItem>
            {[...Array(10).keys()].map(num => {
                return (
                    <PaginationItem>
                        <PaginationLink href="#">{num + 1}</PaginationLink>
                    </PaginationItem>
                );
            })}

            <PaginationItem>
                <PaginationLink href="#" next />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#" last />
            </PaginationItem>
        </Pagination>
    );
};

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.getData();
    }

    async getOrders() {
        await axios
            .get('https://bootcamp-rent-car.herokuapp.com/admin/order')
            .then(response => {
                const orders = response.data;

                this.setState({
                    data: [...orders]
                });
                console.log(response);
            })
            .catch(err => console.error(err));
    }

    getData = (page = '', size = 10, fromDate = '', toDate = '') => {
        // document.getElementById('size').value = size;
        // document.getElementById('page').value = page;

        this.getOrders();
    };

    onSubmit = e => {
        const page = document.getElementById('page').value;
        const size = document.getElementById('size').value;
        const fromDate = document.getElementById('fromDate').value;
        const toDate = document.getElementById('toDate').value;

        this.getData(page, size, fromDate, toDate);
    };

    render() {
        const { data } = this.state;

        const dataObjectsByDate = [];
        for (let i = 1; i <= 31; i++) {
            const dataObjectByDate = { name: i.toString(), count: i * 2 };
            // const dataDates = data.filter(
            //   (datum) =>
            //     new Date(datum.start_rent_at).getDate() === i ||
            //     new Date(datum.finish_rent_at).getDate() === i
            // );
            // dataObjectByDate.count = dataDates.length;

            dataObjectsByDate.push(dataObjectByDate);
        }
        console.log(dataObjectsByDate);

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="bar-chart">
                                <p>
                                    <strong> Rented Car Data Visualization</strong>
                                </p>
                                <Label for="exampleSelect">Month</Label>
                                <Input id="exampleSelect" name="select" type="select">
                                    <option>Januari 2022</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                                {/* <input type="number" id="size" placeholder="pagesize" />
        <input type="number" id="page" placeholder="page" />
        <input type="date" id="fromDate" placeholder="from date" />
        <input type="date" id="toDate" placeholder="to date" />
        <button onClick={this.onSubmit}>Submit</button> */}
                                {/* width="100%" */}
                                <ResponsiveContainer aspect={2}>
                                    <BarChart data={dataObjectsByDate} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" label={'Date'} />
                                        <YAxis dataKey="count" label={'Amount of Car Rented'} />
                                        <Tooltip />
                                        <Bar type="monotone" dataKey="count" fill="#586B90" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Dashboard
                            <p>List Order</p>
                            <GetMyTable />
                            <div className="text-right">
                                <TablePagination />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
