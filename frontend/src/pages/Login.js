import React, { useEffect } from 'react'
import '../sassStyles/pages/login.scss'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logout } from '../features/loginSlice'
import { userProfile } from '../features/userProfileSlice'
import { getAllEmails, resetState } from '../features/addEmailsSlice'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SigninForm = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [passwordShown, setPasswordShown] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logins = useSelector(state => state.login)
    const { isError, isLoggedIn, message, login } = logins
   
    const submitForm = (data) => {
        dispatch(loginUser(data))
        reset()
    };

    // useEffect(()=> {
    //     console.log(logins)
    //     if (isLoggedIn){
    //         dispatch(userProfile(login._id))
    //         dispatch(getAllEmails())
    //     }
    // },[dispatch, login._id, isLoggedIn, logins])


    useEffect(()=> {
        if(isLoggedIn){
            toast.success('Logged in successfully!')
            localStorage.setItem('loggedIn', JSON.stringify(isLoggedIn))
            dispatch(userProfile(login._id))
            dispatch(getAllEmails())
            const timer = setTimeout(()=> {
                navigate('/?page=1')
            },2000)
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isLoggedIn, navigate, dispatch, login._id])


    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message);
    //         dispatch(resetState())
    //     } 
    // }, [isError, message, dispatch])


    const togglePasswordVisiblity = (e) => {
        if (!password && e.target.checked === true) {
            e.target.checked = false
            return
        }
        setPasswordShown(!passwordShown);
    };

const onErrors = errors => console.error(errors);

    return (
        <>
        <div className="container3">
           <ToastContainer theme='dark' position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                toastStyle={{ backgroundColor: "rgb(68, 0, 0)", color: 'rgb(207, 198, 219)' }}
            />
            <div className="login">login</div>
            <form onSubmit={handleSubmit(submitForm, onErrors)} className="form">

                <div className="name2">
                    <label htmlFor="username" className="pass2">Username: </label>
                    <div className="error" style={{ color: 'red', marginBottom: '10px' }}>
                        {errors.username && <div>{errors.username.message}</div>}
                    </div>
                    <input type="text" placeholder="" id="username" name="username3" {...register("username", { required: 'username required!' })} />
                </div>

                <div className="pw">
                    <label htmlFor="password" className="pass2">Password: </label>
                    <div className="error" style={{ color: 'red', marginBottom: '10px' }}>
                        {errors.password && <div>{errors.password.message}</div>}
                    </div>

                    <input type={passwordShown ? "text" : "password"} placeholder="" id="password" name="password3"
                        {...register("password", { required: 'password required!', minLength: { value: 1, message: 'Minimum of 8 characters required!' } })}
                        onChange={(e) => setPassword(e.target.value)} />
                    <div className="showPass"> Show password: </div>
                    <input type="checkbox" className="check" onChange={(e) => togglePasswordVisiblity(e)} />
                </div>

                <button type="submit" className="btn">Submit</button>

            </form>

            <div className="goToRegister">
                    <Link to='/register' style={{ textDecoration: 'none' }} className="goToRegisterText"><span>Not registered? Go to Register.</span></Link><br /><span>Forgot password?</span>
            </div>
        </div>
        </>
    )
}

export default SigninForm

