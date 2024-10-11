import React from 'react'
import "./styles/Patient_Login.css";
import Navbar from './navigation-bar';

function Patient_Login(){
    return(
        <div>
            <Navbar />
            <div className="center-container">
                <h1>Login for Patient</h1>
                <div class= "PLogin">
                    
                    <form>
                        <label>Username</label>
                        <input type="text"/>
                        <label>Password</label>
                        <input type="password"/>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Patient_Login;