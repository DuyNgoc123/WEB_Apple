import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newprods: [],
            hotprods: [],
        };
    }
    render() {
        const newprods = this.state.newprods.map((item) => {
            return (
                <div key={item._id} className="inline">
                    <figure>
                        <Link to={"/product/" + item._id}>
                            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                        </Link>
                        <figcaption className="text-newproduct">
                            {item.name}
                            <br /> Price: {item.price}
                        </figcaption>
                    </figure>
                </div>
            );
        });
        const hotprods = this.state.hotprods.map((item) => {
            return (
                <div key={item._id} className="inline">
                    <figure>
                        <Link to={"/product/" + item._id}>
                            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                        </Link>
                        <figcaption className="text-hotproduct">
                            {item.name}
                            <br /> Price: {item.price}
                        </figcaption>
                    </figure>
                </div>
            );
        });
        return (
            <div>
                <div className="home-newproduct">
                    <h2 className="text-newproduct"> NEW PRODUCTS </h2>
                    {newprods}
                </div>
                {this.state.hotprods.length > 0 ? (
                    <div className="home-hotproduct">
                        <h2 className="text-hotproduct"> HOT PRODUCTS </h2>
                        {hotprods}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        );
    }
    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
    }
    // apis

    apiGetNewProducts() {
        axios.get("/api/customer/products/new").then((res) => {
            const result = res.data;
            this.setState({ newprods: result });
        });
    }
    apiGetHotProducts() {
        axios.get("/api/customer/products/hot").then((res) => {
            const result = res.data;
            this.setState({ hotprods: result });
        });
    }
}
export default Home;
