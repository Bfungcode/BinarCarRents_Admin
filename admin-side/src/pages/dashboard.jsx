<<<<<<< HEAD
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../features/dashboard';
import "../styles/NavandSideBar.css";
import {
  SVGDashboard,
  SVGTruck,
  SVGMenu,
  SVGDropdownMenu,
} from "../vectors/navandsidebar-icon";

const DashboardPage = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth)
  
//  logic validasi login 
  React.useEffect(()=>{ 
    if(isLoggedIn === false){
      alert('belum login'); 
      navigate('/');  
    };
    
  }, [isLoggedIn])
  
  
  return(
    <div className="Dashboard">

    <div className="main-sidebar">
      
        <div className="logo"> logo</div>
        <div className='icon-dashboard'> 
          <SVGDashboard/> 
          <p>Dashboard</p>
        </div>
        <div> 
          <SVGTruck /> 
          <p>Cars</p>
        </div>
        
    </div>
    <div className="right-layout">
      <div className='h-navbar'>
        <div className="logo">Binar-Car</div>
        <div> <SVGMenu /> </div>
        <div className='searchbar'>
          <div class="input-group">
            <div class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder='Search'/>
              <label class="form-label"></label>
            </div>
            <div className='search-button'>
              Search
            </div>
          </div>
      </div>
        <div>

          <div className='acct-icon'>U</div>
          <p>Unis Badri</p>
        </div>
        <div><SVGDropdownMenu /> </div>
      </div>

    <div className="sidebar-content">
      <div className="sidebar">
        <ul>
          <li>CARS</li>
          <li>List Car</li>
        </ul>
      </div>
        <Dashboard />
      </div>  
    </div>
    


  </div>
  )
};
export default DashboardPage
=======
// import React, { useNavigate } from 'react';
// import { useSelector } from 'react-redux';
// import Dashboard from '../features/dashboard';
// import "../styles/NavandSideBar.css";

// <<<<<<< HEAD
// function checkToken () {
//     isAccessToken: true : false
// }

// const GetMyTable = () => {
//     const data = [
//         {
//             id: 1,
//             car: 'Mercedez Benz',
//             user_email: 'wg@creative.org',
//             start_rent: '2022-01-26',
//             finish_rent: '2022-02-02',
//             price: 500000,
//             category: '4-6 orang'
//         },
//         {
//             id: 2,
//             car: 'Suzuki Xpander',
//             user_email: 'jwalters@creative.org',
//             start_rent: '2022-06-14',
//             finish_rent: '2022-02-02',
//             price: 500000,
//             category: '4-6 orang'
//         },
//         {
//             id: 3,
//             car: 'Porsche',
//             user_email: 'bbanner@creative.org',
//             start_rent: '2012-06-20',
//             finish_rent: '2022-02-02',
//             price: 500000,
//             category: '4-6 orang'
//         }
//         // ...
//     ];

//     const [tableData, setTableData] = useState(data);

//     const columns = [
//         { label: 'Car', field: 'car' },
//         { label: 'User Email', field: 'user_email' },
//         { label: 'Start Rent', field: 'start_rent' },
//         { label: 'Finish Rent', field: 'finish_rent' },
//         { label: 'Price', field: 'price' },
//         { label: 'Category', field: 'category' }
//     ];

//     return (
//         <>
//             <Table hover bordered>
//                 <thead>
//                     <tr style={{ backgroundColor: '#CFD4ED' }}>
//                         {columns.map(column => {
//                             return <th key={column.field}>{column.label}</th>;
//                         })}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {tableData.map((data, i) => {
//                         return (
//                             <tr key={i}>
//                                 {columns.map((column, j) => {
//                                     const value = data[column.field] || '-';
//                                     return <td key={column.field + j}>{value}</td>;
//                                 })}
//                             </tr>
//                         );
//                     })}

//                     <tr>
//                         <td>{/* ... */}</td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </>
//     );
// };

// const TablePagination = () => {
//     console.log([...Array(10).keys()]);
//     return (
//         <Pagination>
//             <PaginationItem>
//                 <PaginationLink first href="#" />
//             </PaginationItem>
//             <PaginationItem>
//                 <PaginationLink previous href="#" />
//             </PaginationItem>
//             {[...Array(10).keys()].map(num => {
//                 return (
//                     <PaginationItem>
//                         <PaginationLink href="#">{num + 1}</PaginationLink>
//                     </PaginationItem>
//                 );
//             })}

//             <PaginationItem>
//                 <PaginationLink href="#" next />
//             </PaginationItem>
//             <PaginationItem>
//                 <PaginationLink href="#" last />
//             </PaginationItem>
//         </Pagination>
//     );
// };

// export default class Dashboard extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { data: [] };
//     }

//     componentDidMount() {
//         this.getData();
//     }

//     async getOrders() {
//         await axios
//             .get('https://bootcamp-rent-car.herokuapp.com/admin/order')
//             .then(response => {
//                 const orders = response.data;

//                 this.setState({
//                     data: [...orders]
//                 });
//                 console.log(response);
//             })
//             .catch(err => console.error(err));
//     }

//     getData = (page = '', size = 10, fromDate = '', toDate = '') => {
//         // document.getElementById('size').value = size;
//         // document.getElementById('page').value = page;

//         this.getOrders();
// =======
// const DashboardPage = () => {
//   const navigate = useNavigate();
//   const {isLoggedIn} = useSelector((state) => state.auth)

// //  logic validasi login
//   React.useEffect(()=>{
//     if(isLoggedIn === false){
//       alert('belum login');
//       navigate('/');
// >>>>>>> c87d13ef19671d5b36ce2791ebfb47bc54cc0aad
//     };

//   }, [isLoggedIn])

//   return(
//     <div className="Dashboard">

//       <div className="main-sidebar">

//           <div className="logo"> logo</div>
//           <div> icon1</div>
//           <p>subtitle</p>
//           <div> icon2</div>
//           <p>subtitle</p>
//       </div>
//       <div className="h-navbar">
//         <div className="logo">Binar-Car</div>

//       <div className="sidebar-content">
//         <div className="sidebar">
//           <ul>
//             <li>title1</li>
//             <li>title2</li>
//           </ul>
//         </div>
//           <Dashboard />
//         </div>
//       </div>

//     </div>
//   )
// };
// export default DashboardPage
>>>>>>> Sprint1-Finish
