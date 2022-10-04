import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import { Router, useNavigate } from "react-router-dom";
import '../App'
import {useDispatch, useSelector} from "react-redux";
import {login} from '../auth/auth-slice';


const handleSubmit = async (values, actions, dispatch, navigate) => {
    
    const {email, password} = values;
    dispatch(login({email, password}))
    .unwrap()
    .then(()=> {
      console.log('sukses');
      navigate('/dashboard');
      
    })
    .catch(()=> {
      console.log('error');
    })
  }



const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state) => state.auth)
    // const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const formik = useFormik({


        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object().shape({
            email: yup.string().email('Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.').required(),
            password: yup
                .string()
                .min(6)
                .required('Required'),
        }),

        onSubmit: (values, actions) => {
            handleSubmit(values, actions, dispatch, navigate)
        }
    });

    React.useEffect(()=> {
        if(isLoggedIn){
          navigate('/dashboard');
        }
      }, [isLoggedIn])
      



    return (
        <div className="d-flex flex-column form-container">
            <div className="logo"> Logo here </div>

            
                <h3 className="welcome">Welcome, Admin Binar</h3>

                {formik.touched.email && formik.errors.email?(
                    <div className="failed-alert" > {formik.errors.email}</div>
                    ): null}

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





        
    )
}

export default LoginForm