import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Label, Menu, Table, Container, Button } from 'semantic-ui-react'
import { fetchCartURL } from '../constants';
import { authAxios } from '../utils';


class OrderSummary extends Component {
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
            this.setState({error: err, loading: false})
        });
    }

    render() { 
        const {data, error, loading}= this.state;
        return ( 
            <Container>
                { data && (<Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Item #</Table.HeaderCell>
                        <Table.HeaderCell>Item Name</Table.HeaderCell>
                        <Table.HeaderCell>Item Price</Table.HeaderCell>
                        <Table.HeaderCell>Item quantity</Table.HeaderCell>
                        <Table.HeaderCell>Total Item Price</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.order_items.map((order_item, i)=>{
                            return(
                                <Table.Row key= {order_item.id}>
                                    <Table.Cell>{i+1}</Table.Cell>
                                    <Table.Cell>{order_item.item}</Table.Cell>
                                    <Table.Cell>₹{order_item.item_obj.price}</Table.Cell>
                                    <Table.Cell>{order_item.quantity}</Table.Cell>
                                    <Table.Cell>
                                       {order_item.item_obj.discount_price && <Label ribbon color="green">On Discount</Label>} 
                                       ₹{order_item.final_price}
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                        <Table.Row>
                            <Table.Cell/>
                            <Table.Cell/>
                            <Table.Cell/>
                            <Table.HeaderCell colSpan='2' textAlign="right">
                                Total: ₹{data.total}
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5' textAlign="right">
                           <Link to="/checkout">
                             <Button  color="blue">Chechout</Button>
                           </Link> 
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>)}
            </Container>
         );
    }
}
 
export default OrderSummary;