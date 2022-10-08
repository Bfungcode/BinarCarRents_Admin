import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, Toast, ToastBody } from 'reactstrap';
import NavSideBar from '../features/NavSideBar';
import SVGClock from '../vectors/svg-clock';
import SVGUser from '../vectors/svg-user';
import './../styles/cars.css';

const CarsContent = () => {
  const [cars, setCars] = useState([]); // cars keseluruhan
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState({});
  const [toastSave, setToastSave] = useState(false);
  const [toastDelete, setToastDelete] = useState(false);
  const controller = new AbortController();

  const toggle = () => {
    setModal(!modal);
  };

  const loadCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://bootcamp-rent-car.herokuapp.com/admin/car', {
        signal: controller.signal
      });
      data.sort((a, b) => b.id - a.id);
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const showToastSave = () => {
    const responseStatus = localStorage.getItem('responseStatus');
    setToastSave(!!responseStatus);
    setTimeout(() => setToastSave(false), 4000);
    localStorage.removeItem('responseStatus');
  };

  useEffect(() => {
    loadCars();
    showToastSave();
  }, []);

  const doDelete = async () => {
    await axios
      .delete(`https://bootcamp-rent-car.herokuapp.com/admin/car/${id}`)
      .then(response => {
        console.log(response);
        if (response.statusText === 'OK') {
          loadCars();
          setToastDelete(true);
          setTimeout(() => {
            setToastDelete(false);
          }, 4000);
        } else alert('delete error');
      })
      .catch(error => {
        console.error(error);
      });
    setModal(false);
  };

  const doFilterCars = category => {
    const filteredCars = cars.filter(car => car.category === category);
    setFilteredCars(filteredCars);
  };

  return (
    <>
      <div className="container">
        <div className="row m-3">
          <div className="col-10">
            <p className="fw-bold" style={{ fontSize: '20px' }}>
              List Cars
            </p>
          </div>
          <div className="col-2">
            <Link to={'/cars/add'}>
              <Button className="btn-info">+ Add New Car</Button>
            </Link>
          </div>
        </div>
        {/* toast save success */}
        {toastSave && (
          <div className="row">
            <div className="col d-grid justify-content-center">
              <Toast isOpen={toastSave} fade>
                <ToastBody>Data Berhasil Disimpan</ToastBody>
              </Toast>
            </div>
          </div>
        )}

        {/* toast delete success */}
        {toastDelete && (
          <div className="row">
            <div className="col d-grid justify-content-center">
              <Toast isOpen={toastDelete} fade>
                <ToastBody>Data Berhasil Dihapus</ToastBody>
              </Toast>
            </div>
          </div>
        )}

        <div className="row">
          <div className="d-flex" style={{ columnGap: '1rem' }}>
            <Button className="btn-light" onClick={() => setFilteredCars(cars)}>
              All
            </Button>
            <Button className="btn-light" onClick={() => doFilterCars('2 - 4 orang')}>
              2 - 4 people
            </Button>
            <Button className="btn-light" onClick={() => doFilterCars('4 - 6 orang')}>
              4 - 6 people
            </Button>
            <Button className="btn-light" onClick={() => doFilterCars('6 - 8 orang')}>
              6 - 8 people
            </Button>
          </div>
        </div>

        <div className="car-result row">
          {loading && <p className="text-center">Getting cars data...</p>}
          {!loading && (!filteredCars || filteredCars.length === 0) && (
            <p className="text-center">No data available.</p>
          )}
          {!loading &&
            filteredCars.length > 0 &&
            filteredCars.map((car, index) => {
              return (
                <div key={index} className="car-item">
                  {/* col-lg-4 col-md-6 col-sm-12 */}

                  <div className="text-center mb-3">
                    {car.image && <img key={index} src={car.image} className="car-img" alt="car" />}
                    {!car.image && <img style={{ maxHeight: '160px' }} src="img/no-image-icon.webp" alt="car" />}
                  </div>
                  <p style={{ fontWeight: 400 }}>{car.name || 'N/A'}</p>

                  <p className="car-text-bold">
                    {car.price &&
                      car.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      })}{' '}
                    {!car.price && 'N/A'} / hari
                  </p>
                  <div className="d-inline-flex">
                    <div style={{ marginRight: '0.5rem' }}>
                      <SVGUser />
                    </div>
                    <p className="mb-0 text-secondary">{car.category || 'N/A'}</p>
                  </div>
                  <br />
                  <div className="d-inline-flex mt-3 mb-2">
                    <div style={{ marginRight: '0.5rem' }}>
                      <SVGClock />
                    </div>
                    <p className="text-secondary">Updated at {new Date(car.updatedAt).toUTCString()}</p>
                  </div>
                  <div className="d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <Button
                      onClick={() => {
                        setId(car.id);
                        toggle();
                      }}
                      className="btn-light btn-outline-danger"
                      key={'del-' + index}
                    >
                      Delete
                    </Button>
                    <Link key={index} to={`/cars/${car.id}`}>
                      <Button key={index} className="btn-choose-car car-text-bold">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>

        {/* modal confirmation delete */}
        <Modal isOpen={modal} backdrop="static">
          <ModalBody className="d-grid" style={{ justifyItems: 'center' }}>
            <img src="./img/img-BeepBeep.png" alt="car-delete" width={153} />
            <p>
              <strong>Menghapus Data Mobil</strong>
            </p>
            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={doDelete}>
              Ya
            </Button>
            <Button color="secondary" onClick={toggle}>
              Tidak
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

const Cars = () => {
  return <NavSideBar PageContent={CarsContent} />;
};

export default Cars;
