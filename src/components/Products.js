import React, { Component } from 'react';
import formatCurrency from '../util';
import { Fade, Zoom } from 'react-awesome-reveal';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '30%',
      left: '45%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '0',
      width: '50%',
      transform: 'translate(-40%, -10%)',
    },
  };
Modal.setAppElement('#root')

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product: null,
        };
    }
    openModal = (product)=>{
        this.setState({product});
    };
    closeModal = ()=>{
        this.setState({product: null});
    };
  render() {
      const {product} = this.state;
      
    return (
    <div>
        <Fade cascade={true} damping={0.2}>
        <ul className='products'>
            {this.props.products.map( (product) => (
                <li key={product._id}>
                    <div className='product'>
                        <a href={"#" + product._id} onClick={()=> this.openModal(product)}>
                        <img src={product.image} alt={product.title} />
                        <p>
                        {product.title}
                        </p>
                        </a>
                    <div className='product-price'>
                        <div>
                            {formatCurrency(product.price)}
                        </div>
                        <button onClick={() => this.props.addToCart(product)}
                        className='button primary'>
                            Add To Cart
                        </button>
                    </div>
                    </div>
                </li>
            ) )}
        </ul>
        </Fade>
        {product &&(
            <Modal isOpen={true} onRequestClose={this.closeModal} style={customStyles}>
                <Zoom>
                    <div className='modal-container'>
                      <div className='button-close'>
                    <button className="button" onClick={this.closeModal}>x</button>  
                    </div>
                <div className='product-details'>
                    <div>
                     <img src={product.image} alt={product.title} />   
                    </div>
                    <div className='product-details-description'>
                    <p><strong>{product.title}</strong></p>
                    <p>Description: {' '} {product.description}</p>
                    <p>Available sizes: {" "} {product.availableSizes.map(x=>
                        <span>{" "} <button className='button'>{x}</button></span>
                        )}</p>
                    <div className='product-price'>
                        <div>{formatCurrency(product.price)}</div>
                        <button className='button primary' onClick={()=>{
                        this.props.addToCart(product);
                        this.closeModal();
                        }}>Add To Cart</button>
                    </div>
                    </div>
                </div>  
                    </div>   
                </Zoom>
            </Modal>
        )}
    </div>);
  }
}
