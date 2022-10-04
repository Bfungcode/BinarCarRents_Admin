import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import './../styles/CarAddEdit.css';

const CarAddEditPage = () => {
  const [isAdd, setIsAdd] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState({});
  const controller = new AbortController();

  const loadCar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://bootcamp-rent-car.herokuapp.com/admin/car/' + id, {
        signal: controller.signal
      });
      setCar(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setIsAdd(!id);
    if (id) {
      loadCar();
    }
  }, []);

  const handleUpload = value => {
    console.log(value);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            <p style={{ fontWeight: '700', fontSize: '20px' }}>{isAdd ? 'Add New Car' : 'Edit Car'}</p>
            {loading && <p className="text-center">Loading...</p>}
            {!loading && (
              <div className="add-edit-form">
                <Form>
                  <FormGroup row>
                    <Label sm={2}>
                      Nama/Tipe Mobil <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input id="name" type="text" placeholder="Input Nama/Tipe Mobil"></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Harga <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input id="price" type="text" placeholder="Input Harga Sewa Mobil"></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Foto <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input
                        id="photoFile"
                        type="file"
                        placeholder="Upload Foto Mobil"
                        onChange={e => handleUpload(e)}
                      ></Input>
                      <FormText>File size max. 2MB</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Kategori <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input id="category" type="select" placeholder="Pilih Kategori Mobil">
                        <option value={''} defaultChecked>
                          Pilih Kategori Mobil
                        </option>
                        <option value={'2 - 4 orang'}>2 - 4 orang</option>
                        <option value={'4 - 6 orang'}>4 - 6 orang</option>
                        <option value={'6 - 8 orang'}>6 - 8 orang</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>

                <div className="d-flex justify-content-sm-start" style={{ columnGap: '1rem' }}>
                  <Link to={'/cars'}>
                    <Button className="btn-light btn-outline-primary"> Cancel</Button>
                  </Link>

                  <Button className="btn-primary">Save</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarAddEditPage;
