import React from 'react'

const Nav = () => {
    return (
        <div>
            <nav className="navbar row">
                <div className="col-12 col-md-3 ps-5">
                    <div className="navbar brand">
                    <p className="text-white">logo here</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <form action="search_action" method="get">
                        <div className="input-group">
                            <input id="search_field" className="form-control" type="text" placeholder="Search for products" name="keyword" value=""></input>
                            <button id="search_btn" className="btn" type="submit">Search</button>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <span className="ms-3" id="cart">Cart Here</span>
                    <span className="ms-1" id="cart_count">0</span>
                    <div className="ms-4 dropdown">
                        <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">  
                            <span>User Dropdown Menu</span>
                        </button>
                        <div className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                            <p className="dropdown-item">Dashboard</p>
                            <p className="dropdown-item">Orders</p>
                            <p className="dropdown-item">Profile</p>
                            <p className="dropdown-item">Logout</p>
                        </div>
                        <p className="btn ms-4">Login</p>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav