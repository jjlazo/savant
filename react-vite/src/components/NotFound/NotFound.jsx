import React, { useState, useEffect } from "react"
import "./NotFound.css"
import { useNavigate, useLocation } from "react-router-dom"
import bookwormError from '../../../public/boooookworm.png'

function NotFound({ statusCode, message }) {
    const navigate = useNavigate()
    const { state } = useLocation()
    return (
        <div className="home-container">
            <div className="container-content">
                <div className="not-found-body">
                    <img className="book-bookworm" src={bookwormError} alt="bookworm" />
                    <div className="not-found-body-content">
                        <div>{state?.statusCode || 404}</div>
                        <div>{state?.message || "Request Not Found"}</div>
                        <button onClick={() => navigate("/")} className="return-home-button">Return Home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
