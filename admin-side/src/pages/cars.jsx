import axios from 'axios';
import { useEffect, useState } from 'react';
import SVGClock from '../vectors/svg-clock';
import SVGUser from '../vectors/svg-user';
import './../styles/cars.css';

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
                <div className="row">
                    <div className="col m-3">
                        <p className="fw-bold" style={{ fontSize: '20px' }}>
                            List Cars
                        </p>
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
                                        {/* {!car.image && <div className="car-img-notfound"></div>} */}
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
                                    <div className="d-inline-flex">
                                        <div style={{ marginRight: '0.5rem' }}>
                                            <SVGClock />
                                        </div>
                                        <p className="mb-0 text-secondary">{new Date(car.updatedAt).toDateString()}</p>
                                    </div>

                                    {/* <Link key={index} to={`/cari-mobil/${car.id}`}>
                    <Button key={index} className="btn-choose-car car-text-bold">
                      Pilih Mobil
                    </Button>
                  </Link> */}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Cars;
