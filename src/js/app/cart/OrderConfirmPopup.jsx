import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { UserContext } from "../../contexts/UserContext";
import SelectInput from '../inputs/SelectInput';
import AddUserCard from '../card/AddUserCard';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

export default function ({ cart, setOrderConfirmPopup, setExitAnimation }) {
  const { register, handleSubmit, control, getValues, formState: { errors } } = useForm();
  const [addCard, setAddCard] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [cards, setCards] = useState([]);
  const userContext = useContext(UserContext)
  const cartContext = useContext(CartContext)

  const { tableId } = useParams();

  const FetchCards = async () => {
    await axios({
      method: 'get', url: "https://localhost:44353/v1/card",
      params: {
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    }).then(res => {
      console.log('result:', res);
      setCards(res.data.data);
    });
  }

  useEffect(() => {
    FetchCards()
  }, []);

  const onSubmit = (data, e) => {
    data.shoppingCartItems = cart.cartItems;
    console.log(data);
    axios({
      method: 'POST', url: "https://localhost:44353/v1/order",
      params: {
        tenantId: cart.tenantId,
        tableId: tableId,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${userContext.accessToken}`
      }
    }).then(res => {
      if (res.status === 200) {
        setConfirmed(true);
        cartContext.reset()
        e.target.reset();
      } else {
        console.log(res);
      }
    })
  }


  return (
    <div className='fixed-bg client-side'>
      <div className="order-confirm pt-5 pb-4 popup position-absolute alert alert-light order-confirm popup">
        <button
          className='close-btn'
          onClick={() => setOrderConfirmPopup(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        {
          confirmed === false ?
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="cards">
                <SelectInput
                  label="Choose card "
                  formGroupClassName='full-width'
                  name="card"
                  optionLabel="numberMask"
                  control={control}
                  options={cards}
                  getValues={getValues}
                  optionValue='id'
                  register={register}
                  errorMessage={errors?.card?.message}
                />
              </div>
              <div className='btn btn-secondary btn-sm mb-4' onClick={() => setAddCard(true)}>
                Add New Card
              </div>
              <div className="total mb-3">
                Total: <span className='font-weight-bold big'>{cart.orderTotal + cart.tax} &#8382;</span>
              </div>
              <input
                type="submit"
                className="btn btn-block btn-outline-success confirm"
                // onClick={()=>setConfirmed(true)}
                value='CONFIRM ORDER'
              />
            </form> :
            <>
              <div className='d-flex flex-column'>
                <i className="fas fa-check-circle btn-outline-success fa-check-circle fas larger mx-auto"></i>
                <h4 className='mb-5 mt-3 text-center'>
                  Payment confirmed and Order received by restaurant
                </h4>
                <div
                  className="btn btn-block btn-outline-success confirm"
                  onClick={() => {
                    setOrderConfirmPopup(false);
                    setExitAnimation(1);
                  }}
                >Ok
                </div>
              </div>
            </>
        }
      </div>
      {
        addCard === true && <AddUserCard FetchCards={FetchCards} setAddCard={setAddCard} />
      }
    </div>
  )
}