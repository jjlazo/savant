import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Feed.css"

function Feed({ data }){
    const navigate = useNavigate()

    return(
        <>
            {data.forEach(author => {
                <div> {author.name} </div>
            })}
        </>
    )
}

export default Feed
