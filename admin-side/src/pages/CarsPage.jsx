import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Toast,
  ToastBody
} from 'reactstrap';
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

  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [carCount, setCarCount] = useState(0);

  const toggle = () => {
    setModal(!modal);
  };

  const loadCars = async () => {
    setActiveCategory('');
    getCars({ page });
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
    getCars({ category, page });
  };

  const getCars = async ({ category, page }) => {
    setActiveCategory(category);
    setLoading(true);

    dispatch(getAllCars({ category, page, pageSize: 9 }))
      .unwrap()
      .then(data => {
        setCars(data.cars);
        setLastPage(data.pageCount);
        setPageSize(data.pageSize);
        setCarCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const doDelete = async () => {
    dispatch(deleteCarById({ id }))
      .unwrap()
      .then(() => {
        loadCars();
        setToastDelete(true);
        setTimeout(() => {
          setToastDelete(false);
        }, 4000);
      })
      .catch(() => {});

    setModal(false);
  };

  const handleClickPage = ({ page }) => {
    setPage(page);
    getCars({ page, category: activeCategory });
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: '#F4F5F7' }}>
        <div className="row pt-4 mb-3" style={{ position: 'relative' }}>
          <div className="col-9">
            <p className="fw-bold" style={{ fontSize: '20px' }}>
              List Cars
            </p>
          </div>
          <div className="col-3">
            <Link
              to={'/cars/add'}
              style={{
                position: 'absolute',
                right: '2.2rem'
              }}
            >
              <Button className="btn-add-new">+ Add New Car</Button>
            </Link>
          </div>

          {/* toast save success */}
          {toastSave && (
            <Toast fade className="toast-cars toast-save-success">
              <ToastBody>Data Berhasil Disimpan</ToastBody>
            </Toast>
          )}

          {/* toast delete success */}
          {toastDelete && (
            <Toast isOpen={toastDelete} fade className="toast-cars toast-delete-success">
              <ToastBody>Data Berhasil Dihapus</ToastBody>
            </Toast>
          )}
        </div>

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

                  <div className="d-grid car-item-footer">
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
                </div>
              );
            })}

          {/* Pagination Cars */}
          <div className="cars-pagination">
            <p>
              Showing {page * pageSize - (pageSize - 1)} to {page !== lastPage ? page * pageSize : carCount} of{' '}
              {carCount} entries
            </p>

            <Pagination aria-label="Pagination-cars" size={'md'}>
              <PaginationItem disabled={page === 1}>
                <PaginationLink first href="#" onClick={() => handleClickPage({ page: 1 })}>
                  First
                </PaginationLink>
              </PaginationItem>

              <PaginationItem disabled={page === 1}>
                <PaginationLink previous href="#" onClick={() => handleClickPage({ page: page - 1 })}>
                  Previous
                </PaginationLink>
              </PaginationItem>

              <PaginationItem disabled={page === lastPage}>
                <PaginationLink next href="#" onClick={() => handleClickPage({ page: page + 1 })}>
                  Next
                </PaginationLink>
              </PaginationItem>

              <PaginationItem disabled={page === lastPage}>
                <PaginationLink last href="#" onClick={() => handleClickPage({ page: lastPage })}>
                  Last
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
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
          <ModalFooter className="justify-content-center">
            <Button className="btn-modal-yes" onClick={doDelete}>
              Ya
            </Button>
            <Button className="btn-modal-no" onClick={toggle}>
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
