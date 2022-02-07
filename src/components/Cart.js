import React, { Component } from 'react';
import formatCurrency from '../util';

export default class Cart extends Component {
  render() {
    const {cartItems} = this.props;
    return (
        <div>
    <div>
        {cartItems.length === 0 ? (<div className='cart cart-header'>Cart is empty</div>
        ):(
        <div className='cart cart-header'>You have {cartItems.reduce((a,c)=> a + c.count, 0)} in the cart{" "}</div>
        )}
    </div>
        <div className='cart'>
        <div className='cart-items'>
            <ul>
            {cartItems.map(item => (
                <li key={item._id}>
                    <div>
                    <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                        <div>{item.title}</div>
                        <div className='right'>
                            {formatCurrency(item.price)} x {item.count}{" "}
                        <button className='button' onClick={() => this.props.removeFromCart(item)}>Remove</button>
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
        </div>

        {cartItems.length !== 0 &&(
        <div className='cart'>
            <div className='total'>
                <div>
                    Total: {" "}
                    {formatCurrency(cartItems.reduce((a,c)=> a + c.price*c.count, 0))}
                </div>
                <button className='button primary'>checkout</button>
            </div>
        </div>
        )}
    </div>);
    }}
