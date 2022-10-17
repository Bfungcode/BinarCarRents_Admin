import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, Toast, ToastBody } from 'reactstrap';
import { deleteCarById, getAllCars } from '../features/Admin/adminSlice';
import NavSideBar from '../features/NavSideBar';
import SVGClock from '../vectors/svg-clock';
import SVGEdit from '../vectors/svg-edit';
import SVGTrash from '../vectors/svg-trash';
import SVGUser from '../vectors/svg-user';
import './../styles/cars.css';

const CarsContent = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState({});
  const [toastSave, setToastSave] = useState(false);
  const [toastDelete, setToastDelete] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [page, setPage] = useState(1);
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    setModal(!modal);
  };

  const loadCars = async () => {
    setActiveCategory('');
    getCars();
  };

  useEffect(() => {
    loadCars();
    showToastSave();
  }, []);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [!isLoggedIn]);

  const showToastSave = () => {
    const responseStatus = localStorage.getItem('responseStatus');
    setToastSave(!!responseStatus);
    setTimeout(() => setToastSave(false), 4000);
    localStorage.removeItem('responseStatus');
  };

  const doFilterCars = async category => {
    setActiveCategory(category);
    getCars(category);
  };

  const getCars = async category => {
    setActiveCategory(category);
    setLoading(true);

    dispatch(getAllCars({ category, page, pageSize: 12 }))
      .unwrap()
      .then(data => {
        setCars(data.cars);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const doDelete = async () => {
    dispatch(deleteCarById({ id }))
      .unwrap()
      .then(response => {
        loadCars();
        setToastDelete(true);
        setTimeout(() => {
          setToastDelete(false);
        }, 4000);
      })
      .catch(err => console.error(err));

    setModal(false);
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: '#F4F5F7' }}>
        <div className="row m-3">
          <div className="col-10">
            <p className="fw-bold" style={{ fontSize: '20px' }}>
              List Cars
            </p>
          </div>
          <div className="col-2">
            <Link to={'/cars/add'}>
              <Button className="btn-add-new">+ Add New Car</Button>
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
            <Button className={(activeCategory === '' ? 'active-ct' : '') + 'btn-category'} onClick={loadCars}>
              All
            </Button>
            <Button
              className={(activeCategory === 'small' ? 'active-ct' : '') + 'btn-category'}
              onClick={() => doFilterCars('small')}
            >
              Small
            </Button>
            <Button
              className={(activeCategory === 'medium' ? 'active-ct' : '') + 'btn-category'}
              onClick={() => doFilterCars('medium')}
            >
              Medium
            </Button>
            <Button
              className={(activeCategory === 'large' ? 'active-ct' : '') + 'btn-category'}
              onClick={() => doFilterCars('large')}
            >
              Large
            </Button>
          </div>
        </div>

        <div className="car-result row">
          {loading && <p className="text-center">Getting cars data...</p>}
          {!loading && (!cars || cars.length === 0) && <p className="text-center">No data available.</p>}
          {!loading &&
            cars.length > 0 &&
            cars.map((car, index) => {
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
                    <p className="mb-0 ">{car.category || 'N/A'}</p>
                  </div>
                  <br />
                  <div className="d-inline-flex mt-3 mb-2">
                    <div style={{ marginRight: '0.5rem' }}>
                      <SVGClock />
                    </div>
                    <p>Updated at {new Date(car.updatedAt).toUTCString()}</p>
                  </div>
                  <div className="d-grid btn-action-group">
                    <Button
                      onClick={() => {
                        setId(car.id);
                        toggle();
                      }}
                      className="btn-delete-car"
                      key={'del-' + index}
                    >
                      <div className="btn-car-flex">
                        <SVGTrash />
                        Delete
                      </div>
                    </Button>
                    <Link key={index} to={`/cars/${car.id}`}>
                      <Button key={index} className="btn-choose-car car-text-bold">
                        <div className="btn-car-flex">
                          <SVGEdit />
                          Edit
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          {/* <Pagination aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink
                first
                href="#"
                onClick={() => {
                  setPage(1);
                  loadCars();
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                href="#"
                previous
                onClick={() => {
                  setPage(page - 1);
                  loadCars();
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={page === 100}>
              <PaginationLink
                href="#"
                next
                onClick={() => {
                  setPage(page + 1);
                  loadCars();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                last
                onClick={() => {
                  setPage(100);
                  loadCars();
                }}
              />
            </PaginationItem>
          </Pagination> */}
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
