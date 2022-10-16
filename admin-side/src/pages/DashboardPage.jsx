import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label } from 'reactstrap';
import NavSideBar from '../features/NavSideBar';
import './../styles/Dashboard.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const DashboardContent = () => {
  const [orders, setOrders] = useState([]);
  const [barOrders, setBarOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChart, setLoadingChart] = useState(false);
  const controller = new AbortController();
  const { isLoggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const loadOrders = async (page, rows, sortField, sortDirection) => {
    page = page || 1;
    const user = JSON.parse(localStorage.getItem("user"))

    setLoading(true);
    await axios
      .get('https://bootcamp-rent-cars.herokuapp.com/admin/v2/order', {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          access_token: user.access_token,
        },
        params: {
          page,
          pageSize: rows || rowsPerPage,
          sort: sortField ? `${sortField}:${sortDirection}` : 'created_at:desc'
        },
      })
      .then(response => {
        setOrders(response.data.orders);
        setTotalRows(response.data.count);
        setRowsPerPage(response.data.pageSize);
      })
      .catch(err => console.error(err));
    setLoading(false);
  };

  const loadOrderReport = async month => {
    month = month || new Date().getMonth();
    setLoadingChart(true);
    const user = JSON.parse(localStorage.getItem("user"))
    await axios
      .get('https://bootcamp-rent-cars.herokuapp.com/admin/order/reports', {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          access_token: user.access_token,
        },
        params: {
          from: Moment(new Date(2022, month, 1)).format('YYYY-MM-DD'),
          until: Moment(new Date(2022, month + 1, 0)).format('YYYY-MM-DD')
        }
      })
      .then(response => {
        setBarOrders(response.data);
      })
      .catch(err => console.error(err));
    setLoadingChart(false);
  };

  useEffect(() => {
    loadOrders();
    loadOrderReport();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [!isLoggedIn]);

  const getBarData = () => {
    const barData = [];
    barOrders.forEach(barOrder => {
      barData.push({
        x: new Date(barOrder.day).getDate().toString(),
        y: barOrder.orderCount
      });
    });
    return barData;
  };

  const barData = {
    datasets: [
      {
        label: 'Amount of Car Rented',
        data: getBarData(),
        backgroundColor: '#586B90'
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Date',
        position: 'bottom'
      }
    }
  };

  const columns = [
    { name: 'User Email', selector: row => row.User?.email || '-', sortable: true, sortField: 'user_email' },
    { name: 'Car', selector: row => row.Car?.name || '-', sortable: true, sortField: 'car_name' },
    {
      name: 'Start Rent',
      selector: row => (row.start_rent_at ? new Date(row.start_rent_at).toDateString() : '-'),
      sortable: true,
      sortField: 'start_rent_at'
    },
    {
      name: 'Finish Rent',
      selector: row => (row.finish_rent_at ? new Date(row.finish_rent_at).toDateString() : '-'),
      sortable: true,
      sortField: 'finish_rent_at'
    },
    {
      name: 'Price',
      selector: row =>
        row.total_price
          ? row.total_price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR'
          })
          : '-',
      sortable: true,
      sortField: 'total_price'
    },
    { name: 'Category', selector: row => row.Car?.category || '-', sortable: true, sortField: 'category' },
    {
      cell: row => (
        <Button size="sm" color="info" title="Change Status" onClick={() => doChangeStatus(row.id)}>
          <FontAwesomeIcon icon={faPencil} size="sm" />
        </Button>
      ),
      button: true,
      name: 'Action'
    }
  ];

  const doChangeStatus = async id => {
    await axios
      .patch(
        `https://bootcamp-rent-cars.herokuapp.com/admin/order/${id}`,
        { status: 1 },
        {
          signal: controller.signal,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        }
      )
      .then(response => {
        alert(response.data.message);
        // loadOrderReport(); set combobox to default value
      })
      .catch(err => {
        console.log(err);
        alert('Error change status!');
      });
  };

  const handlePageChange = page => {
    setPage(page);
    loadOrders(page, rowsPerPage);
  };

  const handleRowsChange = (rows, page) => {
    loadOrders(page, rows);
  };

  const handleSort = ({ sortField }, sortDirection) => {
    loadOrders(page, rowsPerPage, sortField, sortDirection);
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: '#F4F5F7' }}>
        <div className="row">
          <div className="col-3">
            <div className="d-flex">
              <div className="title-square"></div>
              <p className="dashboard-title">Rented Car Data Visualization</p>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-3">
            <Label for="exampleSelect">Month</Label>
            <Input
              id="exampleSelect"
              name="selectMonth"
              type="select"
              onChange={e => loadOrderReport(+e.target.value)}
              defaultValue={new Date().getMonth()}
            >
              {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
              ].map((month, i) => {
                return (
                  <option value={i} key={'option-' + i}>
                    {month} - 2022
                  </option>
                );
              })}
            </Input>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {loadingChart && <p className="text-center">Getting order data...</p>}
            {!loadingChart && <Bar style={{ background: '#f4f5f7' }} options={barOptions} data={barData}></Bar>}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-3">
            <div className="table-dashboard-text">Dashboard</div>
            <div className="d-flex mt-3">
              <div className="title-square"></div>
              <p className="dashboard-title">List Order</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <DataTable
              columns={columns}
              data={orders}
              progressPending={loading}
              pagination
              paginationServer
              paginationTotalRows={totalRows}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsChange}
              onSort={handleSort}
              sortServer
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardPage = () => {
  return <NavSideBar PageContent={DashboardContent} />;
};

export default DashboardPage;
