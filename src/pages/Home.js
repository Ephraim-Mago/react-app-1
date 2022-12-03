import React, { useState, useEffect } from 'react';
//import FoodData from '../assets/data/FoodData';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Cards from '../components/Cards';
import Set from '../components/Set';

function Home() {
    const [data, setData] = useState([]);

    const [copydata, setCopyData] = useState([]);

    const zomalogo = "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png";
    const API_KEY = "?API_KEY=ZXBocmFpbS1tYWdvL2Vjb20tYXBpLXYxLzIwMjI=";
    const url = "https://v4.oasisrdcongo.org/api/";
    const config = {
        mode: 'cors'
    };

    const fetch = async (path) => {
        let action = url + path + API_KEY;
        await axios.get(action, config)
            .then(res => setData(res.data.data))
            .catch(err => console.log(err.message));
    };

    const changeData = (e) => {
        let getChangeData = e.toLowerCase();

        if (getChangeData === "") {
            setCopyData(data);
        } else {
            let storeData = copydata.filter((element) => {
                return element.rname.toLowerCase().match(getChangeData);
            });
            setCopyData(storeData);
        }
    };

    useEffect(() => {
        fetch('foods');
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setCopyData(data);
        }, 3000);
    }, [data]);

    return (
        <>
            <div className='container d-flex justify-content-between align-item-center mt-3'>
                <img src={zomalogo}
                    style={{
                        width: "8rem",
                        position: "relative",
                        left: "2%",
                        cursor: "pointer"
                    }} alt=""
                />
                <h2 style={{ color: "#1b1464", cursor: "pointer" }}>Search Filter App</h2>
            </div>

            <Form className='d-flex justify-content-center align-items-center mt-3'>
                <Form.Group className="mx-2 col-lg-4" controlId="formBasicEmail">
                    <Form.Control type="email" onChange={(e) => changeData(e.target.value)} placeholder="Search restaurant" />
                </Form.Group>
                <button className='btn text-light col-lg-1' style={{ backgroundColor: "#ed4c67" }}>Submit</button>
            </Form>

            <section className='item_section mt-4 container'>
                <h2 className='px-4' style={{ fontWeight: 400 }}>Restaurants in Ahmedabad Open now</h2>

                <div className='row mt-2 d-flex justify-content-around align-items-center'>
                    {copydata && copydata.length ? <Cards data={copydata} /> : <Set sdata={data} />}
                </div>
            </section>
        </>
    )
}

export default Home