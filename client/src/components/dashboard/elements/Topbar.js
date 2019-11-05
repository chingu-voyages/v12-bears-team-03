import React, {useState}from 'react'
import PropTypes from 'prop-types'

const SearchBar=()=>{
    const [term, setTerm] = useState("");
  
    return(
        <input type="text" onChange={e=>setTerm(e.target.value.trim())}/>

    )

}

const Avatar = ()=>(
    <div className="mx-auto">user</div>
)

const Topbar = props => {
    return (
        <div className="container-fluid" width="80vw">
            <div className="row">
                <div className="d-xs-none d-sm-none d-md-inline col-md-10">  <SearchBar/> </div>
            <div className="col-md-2 col-sm-6"><Avatar/></div>
             </div>
            
        </div>
    )
}

Topbar.propTypes = {

}

export default Topbar
