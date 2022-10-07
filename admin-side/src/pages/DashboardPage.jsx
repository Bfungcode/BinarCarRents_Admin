import axios from 'axios';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import { Input, Label } from 'reactstrap';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [barOrders, setBarOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const controller = new AbortController();

  const loadOrders = async () => {
    setLoading(true);
    await axios
      .get('https://bootcamp-rent-car.herokuapp.com/admin/order', { signal: controller.signal })
      .then(response => {
        setOrders(response.data);
        handleChangeMonth(new Date().getMonth(), response.data);
      })
      .catch(err => console.error(err));
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getBarData = () => {
    const dataObjectListByDate = [];
    for (let i = 1; i <= 31; i++) {
      const dataObjectByDate = { x: i.toString(), y: 0 };
      const dataDates = barOrders.filter(order => new Date(order.start_rent_at).getDate() === i);
      dataObjectByDate.y = dataDates.length;

      dataObjectListByDate.push(dataObjectByDate);
    }
    return dataObjectListByDate;
  };

  const handleChangeMonth = (month, dataList) => {
    const barOrders = (dataList || orders).filter(
      order =>
        new Date(order.start_rent_at).getMonth() === month && new Date(order.start_rent_at).getFullYear() === 2022
    );
    setBarOrders(barOrders);
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
        text: 'Rented Car Data Visualization'
      }
    }
  };

  const columns = [
    { name: 'User Email', selector: row => row.User?.email || '-', sortable: true },
    { name: 'Car', selector: row => row.Car?.name || '-', sortable: true },
    {
      name: 'Start Rent',
      selector: row => (row.start_rent_at ? new Date(row.start_rent_at).toDateString() : '-'),
      sortable: true
    },
    {
      name: 'Finish Rent',
      selector: row => (row.finish_rent_at ? new Date(row.finish_rent_at).toDateString() : '-'),
      sortable: true
    },
    {
      name: 'Price',
      selector: row =>
        row.Car?.price
          ? row.Car?.price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR'
            })
          : '-',
      sortable: true
    },
    { name: 'Category', selector: row => row.Car?.category || '-', sortable: true }
  ];

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Label for="exampleSelect">Month</Label>
            <Input
              id="exampleSelect"
              name="selectMonth"
              type="select"
              onChange={e => handleChangeMonth(+e.target.value)}
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
            {loading && <p className="text-center">Getting order data...</p>}
            {!loading && <Bar options={barOptions} data={barData}></Bar>}
          </div>
        </div>

        <div className="row">
          <div className="col">{!loading && <DataTable columns={columns} data={orders} pagination></DataTable>}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
