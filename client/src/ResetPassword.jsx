
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const [password, setPassword] = useState();
    const {token} = useParams()
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/resetpassword/' + token, {password})
        .then(result => {
            console.log(result)
            if(result.data.status){
                alert("Update password")
                navigate('/login')
            }

        })
        .catch(err => console.log(err))
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="text"
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Reset
                    </button>
                
                </form>
            </div>
        </div>
    )
}

export default ResetPassword