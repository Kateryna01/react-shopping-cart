import React, { Component } from 'react';
import formatCurrency from '../util';
import { Fade } from 'react-awesome-reveal';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false};
    }
    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    createOrder = (e)=>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order)
    };
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
            <Fade cascade={true} direction='left' damping={0.3} triggerOnce duration={700}>
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
            </Fade>
        </div>
        </div>

        {cartItems.length !== 0 &&(
            <div>
               <div className='cart'>
            <div className='total'>
                <div>
                    Total: {" "}
                    {formatCurrency(cartItems.reduce((a,c)=> a + c.price*c.count, 0))}
                </div>
                <button onClick={()=> {this.setState({showCheckout: true})}} className='button primary'>checkout</button>
            </div>
        </div>
        {this.state.showCheckout && (
            <Fade cascade direction='right'>
            <div className='cart'>
            <form onSubmit={this.createOrder} action="">
            <ul className='form-container'>
                <li>
                    <label htmlFor="">Email</label>
                    <input name='email' type="email" required onChange={this.handleInput}/>
                </li>
                <li>
                    <label htmlFor="">Name</label>
                    <input name='name' type="text" required onChange={this.handleInput}/>
                </li>
                <li>
                    <label htmlFor="">Address</label>
                    <input name='address' type="text" required onChange={this.handleInput}/>
                </li>
                <li>
                    <button type='submit' className='button primary'>Place your order</button>
                </li>
            </ul>
            </form>
            </div>
            </Fade>
        )} 
            </div>
        
        )}
    </div>);
    }}
