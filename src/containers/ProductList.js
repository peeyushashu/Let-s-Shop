import React, { Component } from 'react';
import { Image, Item, Container, Button, Icon, Label, Dimmer, Loader, Segment,Message } from 'semantic-ui-react'
import axios from 'axios'
import { productListURL,addToCartURL } from '../constants';
import { authAxios } from "../utils";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";

const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

class ProductList extends Component {
    state = { 
        loading: false,
        error: null,
        data: []
     }

    componentDidMount() {
        this.setState({loading: true})
        axios.get(productListURL)
        .then(res=>{
            this.setState({data: res.data, loading:false})
        })
        .catch(err=>{
            this.setState({error: err, loading:false})
        })
    }

    handleAddToCartURL= slug=>{
      this.setState({loading: true})
        authAxios.post(addToCartURL, {slug})
        .then(res=>{
            console.log(res.data);
            this.props.fetchCart();//update count
            this.setState({loading:false})
        })
        .catch(err=>{
            this.setState({error: err, loading:false})
        })
    }

    render() { 
      const {data, error, loading}= this.state;
        return ( 
            <Container fixed="top" >
              {error&&(
                      <Message negative>
                        <Message.Header>We're sorry! cann't load the objects.</Message.Header>
                        <p>{JSON.stringify(error)}</p>
                      </Message>
                  )}
              {loading&&(
                <Segment>
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                
                  <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                </Segment>
              )}
            <Item.Group>
              {data.map(item=> {
                return <Item key={item.id}>
                        <Item.Image size='tiny' src={item.image} />
                        <Item.Content>
                          <Item.Header>{item.title}</Item.Header>
                          <Item.Meta>
                            <span className='stay'>{item.category}</span>
                          </Item.Meta>
                          <Item.Description>{item.description}</Item.Description>
                          <Item.Extra>
                              <Button primary floated="right" size="mini"icon labelPosition="right" onClick={()=>this.handleAddToCartURL(item.slug)}>
                                  Add to cart
                                  <Icon name="plus cart"/>
                              </Button>
                        </Item.Extra>
                        <Label as='a' tag>{item.price}</Label>
                        <Label as='a' color='green'>{item.label}</Label>
                        {item.discount_price && <Label as='a' color={item.label ==="primary"? "green": item.label ==="secondary"? "blue": "red"} tag>{item.discount_price}</Label>}
                        </Item.Content>
                      </Item>                
              })}
            
          </Item.Group>
          </Container>
         );
    }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.shopingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: ()=> dispatch(fetchCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);


