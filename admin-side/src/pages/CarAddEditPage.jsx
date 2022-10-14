import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import * as Yup from 'yup';
import './../styles/CarAddEdit.css';

const CarAddEditPage = () => {
  const [isAdd, setIsAdd] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const controller = new AbortController();
  const { isLoggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    values.price = +values.price;
    values.status = false;
    if (id) {
      /** edit */
      await axios
        .put(`https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`, values, {
          headers: { 'Content-Type': 'multipart/form-data', access_token: localStorage.getItem('access_token') }
        })
        .then(response => {
          console.log(response);
          actions.setSubmitting(false);
          actions.resetForm();
          localStorage.setItem('responseStatus', 'OK');
          setError(null);
          navigate('/cars');
        })
        .catch(error => {
          console.error(error);
          actions.setSubmitting(false);
          setError(error);
        });
    } else {
      /** add new */
      await axios
        .post(`https://bootcamp-rent-cars.herokuapp.com/admin/car`, values, {
          headers: { 'Content-Type': 'multipart/form-data', access_token: localStorage.getItem('access_token') }
        })
        .then(response => {
          console.log(response);
          actions.setSubmitting(false);
          actions.resetForm();
          localStorage.setItem('responseStatus', 'OK');
          setError(null);
          navigate('/cars');
        })
        .catch(error => {
          console.error(error);
          actions.setSubmitting(false);
          setError(error);
        });
    }
  };

  const loadCar = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://bootcamp-rent-cars.herokuapp.com/admin/car/' + id, {
        signal: controller.signal,
        headers: { access_token: localStorage.getItem('access_token') }
      });
      formik.setFieldValue('name', data?.name || '');
      formik.setFieldValue('price', data?.price || '');
      formik.setFieldValue('image', data?.image || '');
      formik.setFieldValue('category', data?.category || '');
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

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [!isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: {},
      category: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(100, 'max 100 karakter').required('Tidak boleh kosong'),
      price: Yup.number('Harus angka')
        .required('Tidak boleh kosong')
        .positive()
        .integer()
        .min(10000, 'minimum Rp 10,000')
        .max(2147483647, 'maximum Rp 2,147,483,647'),
      image: Yup.mixed()
        .test('file', 'Gambar tidak boleh kosong', value => {
          return !!value;
        })
        .test('file', 'Maksimum size gambar 2MB', value => {
          return value.size <= 2000000;
        }),
      category: Yup.string().required('pilih salah satu')
    }),
    onSubmit: (values, actions) => {
      console.log(values);
      handleSubmit(values, actions);
    }
  });

  return (
    <>
      <div className="container mt-3" style={{ backgroundColor: '#F4F5F7' }}>
        {error && <p>Error! {error}</p>}
        <div className="row">
          <div className="col">
            <p style={{ fontWeight: '700', fontSize: '20px' }}>{isAdd ? 'Add New Car' : 'Edit Car'}</p>
            {loading && <p className="text-center">Loading...</p>}
            {!loading && (
              <div className="add-edit-form">
                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>
                      Nama/Tipe Mobil <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input
                        placeholder="Input Nama/Tipe Mobil"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                      ></Input>
                      {formik.touched.name && formik.errors.name && (
                        <p className="text-danger"> {formik.errors.name} </p>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Harga <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input
                        name="price"
                        placeholder="Input Harga Sewa Mobil"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                      ></Input>
                      {formik.touched.price && formik.errors.price && (
                        <p className="text-danger"> {formik.errors.price} </p>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Foto <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input
                        name="image"
                        type="file"
                        multiple={false}
                        accept="image/*"
                        placeholder="Upload Foto Mobil"
                        onChange={e => {
                          formik.setFieldValue('image', e.target.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                      />

                      <FormText>File size max. 2MB</FormText>
                      {formik.touched.image && formik.errors.image && (
                        <p className="text-danger"> {formik.errors.image} </p>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>
                      Kategori <small className="text-danger">*</small>
                    </Label>
                    <Col sm={6}>
                      <Input
                        name="category"
                        type="select"
                        placeholder="Pilih Kategori Mobil"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      >
                        <option value={''} defaultChecked>
                          Pilih Kategori Mobil
                        </option>
                        <option value={'small'}>small</option>
                        <option value={'medium'}>medium</option>
                        <option value={'large'}>large</option>
                      </Input>
                      {formik.touched.category && formik.errors.category && (
                        <p className="text-danger"> {formik.errors.category} </p>
                      )}
                    </Col>
                  </FormGroup>

                  <div className="d-flex justify-content-sm-start" style={{ columnGap: '1rem' }}>
                    <Link to={'/cars'}>
                      <Button className="btn-light btn-outline-primary"> Cancel</Button>
                    </Link>
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarAddEditPage;
