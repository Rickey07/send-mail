import React , {useState} from 'react';
import {Container,Card,Form, Button} from 'react-bootstrap'

export default function Login() {
    const [userDetails,setUserDetails] = useState({name:"",email:"",password:""})

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name,email,password} = userDetails
        console.log(JSON.stringify({name,email,password}))
        try{
            let options = {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({name,email,password})
            }
            const response = await fetch('http://localhost:5000/signup',options);
            const responseJson = await response.json();
            if (responseJson.error) {
                alert(responseJson.error)
            } else {
                alert(responseJson.msg)
            }
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        setUserDetails({...userDetails,[e.target.name]:e.target.value})
    }
  return (
    <>
        <Container className='d-flex justify-content-center align-items-center h-100'>
            <Card className='w-50 p-4'>
                <h1 className='text-center'>SignUp</h1>
                <Card>
                    <Form className='d-flex flex-column p-4' onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='formBasicName'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter your Full Name' name='name' onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter your email' name='email' onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter your password' name='password' onChange={handleChange}></Form.Control>
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Sign Up
                        </Button>
                    </Form>
                </Card>
            </Card>
        </Container>
    </>
  )
}