import React, { Component } from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Container, Button, Item, Divider, Form } from 'semantic-ui-react';
import { authAxios } from '../utils';
import { fetchCartURL, addcouponURL } from '../constants';

class CouponForm extends Component {
  state = { 
    error: null,
    loading: false,
    code:''
 }

  handleAddCoupon=(e)=>{
    e.preventDefault();
    this.setState({loading: true})
    const {code} = this.state
    authAxios.post(addcouponURL, {code})
    .then(res=>{
      this.setState({loading:false})
    })
    .catch(err=>{
      this.setState({error: err, loading: false})
    })
  }
  handleChange=(e)=>{
    this.setState({code:e.target.value})
  }
  render() { 
    const {code}=this.state
    return ( 
      <Form onSubmit={this.handleAddCoupon}>
        <Form.Field>
          <label>Coupon</label>
          <input placeholder='Enter coupon code' value={code} onChange={this.handleChange}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
     );
  }
}


class PaymentPreview extends Component {
  state = { 
    data: null,
    error: null,
    loading: false
 }

  componentDidMount() {
      this.handleFetchOrder();
  }

  handleFetchOrder=()=>{
      this.setState({loading: true})
      authAxios
      .get(fetchCartURL)
      .then(res => {
        this.setState({data: res.data, loading: false})
      })
      .catch(err => {
          if (err.response.status === 404){
            this.setState({
              error: "You currently don't have any order.",
              loading: false
            })
          }
          else
          this.setState({error: err, loading: false})
      });
  }

  render() { 
    const {data, error, loading}= this.state;
    console.log(data);
    return (   
      <Item.Group>
         {data && data.order_items.map((order_item, i)=>{
            return(
              <Item key= {order_item.id}>
                <Item.Image size='tiny' src={`http://127.0.0.1:8000${order_item.item_obj.image}`} />
                <Item.Content verticalAlign='middle'>{order_item.item} X {order_item.quantity}</Item.Content>
              </Item>)}
              )}
            {data && <Item>
                    <Item.Content verticalAlign='middle' />
                    <Item.Header>Total Price: ₹{data.total}</Item.Header>
                  </Item>}
      </Item.Group> );
  }
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  return (
    <Container text>
    <form style={{ marginTop: "30px"}} onSubmit={handleSubmit}>
     <h1>Complete your order</h1>
     <PaymentPreview/>
      <Divider/>
        <CouponForm />
      <Divider/>
      <CardElement />
        <p></p>
        <Button primary type="submit" disabled={!stripe}>
            Pay
        </Button>
    </form>
    </Container>
  ); 
};

export default CheckoutForm;