import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Router, useNavigate } from "react-router-dom";
import '../App'
import axios from 'axios';


const handleSubmit = async (values, actions, navigate) => {
    try {
        const response = await axios({
            method: "POST",
            // masih pakai login url cutomer
            url: "https://bootcamp-rent-car.herokuapp.com/customer/auth/login",
            data: values,
        })
        actions.setSubmitting(false);
        actions.resetForm()
        navigate('/dashboard');
        localStorage.setItem('users', JSON.stringify(response.data.access_token));
    } catch (error) {
        actions.setSubmitting(false);
        alert(error.messsage);
    };



}

const LoginForm = () => {
    const navigate = useNavigate();
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const formik = useFormik({


        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object().shape({
            email: yup.string().email('Please enter a valid email').required(),
            password: yup
                .string()
                .min(6)
                // .matches(passwordRules, { message: 'Email or password is incorrect' })
                .required('Required'),
        }),

        onSubmit: (values, actions) => {
            handleSubmit(values, actions, navigate)
        }
    });



    return (
        <div className="d-flex flex-column form-container">
            <div className="d-inline-flex bg-primary logo"> Logo here </div>

            <div className="formisi">
                <h3 className="welcome">Welcome, Admin Binar</h3>

                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <label className="label">Email</label>
                    <div>

                        <input
                            id="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Contoh: johndee@gmail.com"
                            onBlur={formik.handleBlur}
                            className="fieldInput"
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red" }} > {formik.errors.email}</div>
                    ) : null}

                    <label className="label">Password</label>
                    <div>
                        <input
                            id="password"
                            type="password"
                            placeholder="6+ Karakter"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="fieldInput"
                        />
                        {formik.touched.email && formik.errors.password ? (
                            <div style={{ color: "red" }} > {formik.errors.password}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="signin">Sign in</button>
                </form>
            </div>





        </div>
    )
}

export default LoginForm