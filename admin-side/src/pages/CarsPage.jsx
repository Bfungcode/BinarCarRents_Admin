import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import SVGClock from '../vectors/svg-clock';
import SVGUser from '../vectors/svg-user';
import './../styles/Cars.css';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const controller = new AbortController();

  const loadCars = async () => {
    // setLoading(true);
    try {
      const { data } = await axios.get('https://bootcamp-rent-car.herokuapp.com/admin/car', {
        signal: controller.signal
      });
      setCars(data);
    } catch (error) {
      console.error(error);
    }
    // setLoading(false);
  };

  useEffect(() => {
    loadCars();
  }, []);

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
        <div className="row">
          <div className="d-flex" style={{ columnGap: '1rem' }}>
            <Button className="btn-light">All</Button>
            <Button className="btn-light">2 - 4 people</Button>
            <Button className="btn-light">4 - 6 people</Button>
            <Button className="btn-light">6 - 8 people</Button>
          </div>
        </div>

        <div className="car-result row">
          {cars.length > 0 &&
            cars.map((car, index) => {
              return (
                <div key={index} className="car-item">
                  {/* col-lg-4 col-md-6 col-sm-12 */}

                  <div className="text-center mb-3">
                    {car.image && <img key={index} src={car.image} className="car-img" />}
                    {!car.image && <img style={{ maxHeight: '160px' }} src="img/no-image-icon.webp" />}
                  </div>
                  <p style={{ fontWeight: 400 }}>{car.name}</p>

                  <p className="car-text-bold">
                    {car.price &&
                      car.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      })}{' '}
                    / hari
                  </p>
                  <div className="d-inline-flex">
                    <div style={{ marginRight: '0.5rem' }}>
                      <SVGUser />
                    </div>
                    <p className="mb-0 text-secondary">{car.category}</p>
                  </div>
                  <br />
                  <div className="d-inline-flex mt-3 mb-2">
                    <div style={{ marginRight: '0.5rem' }}>
                      <SVGClock />
                    </div>
                    <p className="text-secondary">{new Date(car.updatedAt).toDateString()}</p>
                  </div>
                  <div className="d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <Button className="btn-light btn-outline-danger" key={'del-' + index}>
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
      </div>
    </>
  );
};

export default Cars;
