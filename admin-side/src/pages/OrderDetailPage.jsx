import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import NavSideBar from '../features/NavSideBar';
import { getOrderDetail } from '../features/Admin/adminSlice';
import { setMessage } from '../auth/message-slice';

const OrderDetailContent = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const dispatch = useDispatch();
  const loadOrder = async () => {
    setLoading(true);
    dispatch(getOrderDetail({ id: orderId }))
      .unwrap()
      .then((data) => { setOrder(data) })
      .catch(err => dispatch(setMessage(err)))
    setLoading(false);
  }

  useEffect(() => {
    loadOrder();
  }, []);

  return (
    <>
      <div className="container mb-3 py-4" style={{ backgroundColor: '#F4F5F7' }}>
        <div className="row">
          <div className="col">
            <p style={{ fontWeight: '700', fontSize: '20px' }}>Order Detail</p>
          </div>
        </div>
        {loading && <p>Getting order detail...</p>}
        {!loading && (
          <>
            <div className="row">
              <div className="col">
                <div className="text-center mb-3">
                  {order?.Car && order?.Car.image && (
                    <img height={'160px'} src={order?.Car?.image} className="car-img" alt="car" />
                  )}
                  {(!order?.Car || !order.Car.image) && (
                    <img style={{ maxHeight: '160px' }} src="img/no-image-icon.webp" alt="car" />
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-3">User Email</div>
              <div className="col">{order?.User?.email || '-'}</div>
            </div>
            <div className="row">
              <div className="col-3">Status</div>
              <div className="col">{order?.status ? 'Rented' : 'Available'}</div>
            </div>
            <div className="row">
              <div className="col-3">Rental Date</div>
              <div className="col">
                {order?.start_rent_at ? new Date(order?.start_rent_at).toDateString() : '-'} -{' '}
                {order?.finish_rent_at ? new Date(order?.finish_rent_at).toDateString() : '-'}
              </div>
            </div>
            <div className="row">
              <div className="col-3">Car</div>
              <div className="col">{order?.Car?.name || '-'}</div>
            </div>
            <div className="row">
              <div className="col-3">Category</div>
              <div className="col">{order?.Car?.category || '-'}</div>
            </div>
            <div className="row">
              <div className="col-3">Price</div>
              <div className="col">
                {order?.total_price
                  ? order?.total_price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR'
                  })
                  : '-'}
              </div>
            </div>
            <div className="row">
              <div className="col-3">Payment Slip</div>
              <div className="col">
                {order?.slip ? (
                  <p>
                    Click{' '}
                    <a href={order?.slip} target="_blank" rel="noreferrer">
                      here
                    </a>{' '}
                    to view payment slip.
                  </p>
                ) : (
                  '-'
                )}
              </div>
            </div>

            <div className="row mt-5">
              <div className="col">
                <div className="d-flex justify-content-sm-start">
                  <Link to={'/dashboard'}>
                    <Button color="secondary">Back</Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const OrderDetailPage = () => {
  return <NavSideBar PageContent={OrderDetailContent} />;
};

export default OrderDetailPage;
