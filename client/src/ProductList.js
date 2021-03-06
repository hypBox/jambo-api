import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class ProductList extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state = {groups: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/products/')
            .then(response => response.json())
            .then(data => this.setState({groups: data, isLoading: false}))
            .then(()=> console.log("is loading: "))
            .catch(() => this.props.history.push('/'));
    }

    async remove(id) {
        await fetch(`/products/${id}`, {
            method: 'DELETE',
            headers: {
                'X-XSRF-TOKEN': this.state.csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then(() => {
            let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
            this.setState({groups: updatedGroups});
        });
    }

    render() {
        console.log("rendering order list")
        const {groups, isLoading} = this.state;
        console.log("before loading")
        if (isLoading) {
            console.log("in loading")
            return <p>Loading...</p>;
        }

        const groupList = groups.map(group => {
            return <tr key={group.id}>
                <td style={{whiteSpace: 'nowrap'}}><img style={{maxWidth: '100px'}} src={group.imageUrl} alt=""/></td>
                <td style={{whiteSpace: 'nowrap'}}>{group.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{group.title}</td>
                <td style={{whiteSpace: 'nowrap'}}>{group.price}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/products/" + group.id}>Show</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        console.log("before return")
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right mt-2">
                        <Button color="success" tag={Link} to="/products/new">Add Product</Button>
                    </div>
                    <br/>
                    <h2>Jambo Products</h2>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Image</th>
                            <th width="20%">Id</th>
                            <th width="20%">Title</th>
                            <th width="20%">Price</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default withCookies(withRouter(ProductList));