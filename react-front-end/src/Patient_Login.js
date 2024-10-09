import React from 'react'
import "./styles/Patient_Login.css";

function Patient_Login(){
    return(
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
    )
}

export default Patient_Login;