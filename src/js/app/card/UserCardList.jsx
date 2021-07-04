import React, {useContext,useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import axios from "axios";
import { Card } from 'react-bootstrap';
import { cssNumber } from "jquery";

export default function ({setAddUserCardComponent}) {
  const [cards, setCards] = useState([]);
  const [exitAnimation, setExitAnimation] = useState(0);
  const context = useContext(UserContext);
  const queryString = require('query-string');

  const FetchCards = async () => {
    await axios({ method:'get', url : "https://localhost:44353/v1/card",
        params: {
            PageSize : 10,
            PageIndex : 1
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${context.accessToken}`
        }
    }).then(res => {
      console.log(res.data.data);
      setCards(res.data.data);
      console.log(cards)
      //res.data.totalCount < pageSize ? setPagesAmount(1) : setPagesAmount(parseInt(res.data.totalCount/pageSize));
    });
  }

  useEffect(()=>{
    FetchCards()
  },[]);

  return (
      <div className='main-padding'>
        <div>
            {
                cards.length > 0 ?
                cards.map((item,index) => {
                    <Card key={index} style={{ width: '100%' }}>
                        <Card.Body>
                            <Card.Title className="w-100">{item.NumberMask}</Card.Title>
                                <Card.Subtitle className="block mb-2 text-muted">Expires : {item.Expires}, CCV : {item.CCV}</Card.Subtitle>
                        </Card.Body>
                        <Card.Text>
                            Card Holder : {item.CardHolder}
                        </Card.Text>
                    </Card>
                })
                :
                
                <div className="m-auto">No Cards</div>
            }
        </div>
      </div>
  )
} 