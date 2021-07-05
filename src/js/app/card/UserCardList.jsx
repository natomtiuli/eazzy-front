import React, {useContext,useEffect, useState} from "react";
import {UserContext} from "../../contexts/UserContext";
import axios from "axios";
import { Card } from 'react-bootstrap';
import { cssNumber } from "jquery";

export default function ({setAddUserCardComponent}) {
  const [cards, setCards] = useState([]);
  const context = useContext(UserContext);

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
      console.log('result:',res);
      setCards(res.data.data);
    });
  }

  console.log(cards)
  
  useEffect(()=>{
    FetchCards()
  },[]);

  return (
    <div>
      {
        cards.length > 0 ?
        cards.map((item,index) => {
          return (
            <Card key={index} style={{ width: '100%' }}>
              <Card.Body>
                <Card.Title className="w-100">{item.numberMask}</Card.Title>
                    <Card.Subtitle className="block mb-2 text-muted">Expires : {item.expires}, CCV : {item.cCV}</Card.Subtitle>
              </Card.Body>
              <Card.Text className="block ml-3 mb-2">
                  Card Holder : {item.cardHolder}
              </Card.Text>
            </Card>
          )
        })
        :
        
        <div className="m-auto">You don't have saved cards</div>
      }
    </div>
  )
} 