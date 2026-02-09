import {useEffect, useState} from "react";
import clientApi from "./AxiosApi";
import {ListGroup, Container, Alert, Spinner, ListGroupItem} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import type {OrderData} from "../Types.tsx";

const Orders = () => {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await clientApi.get('/api/v1/orders/user/current');
                setOrders(response.data.slice(0, 5));
                setError(null);
            } catch (err) {
                if(err instanceof Error) {
                    setError(err.message);
                }
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1>Your orders</h1>
            <ListGroup>
                {orders.map((order) =>(
                    <ListGroupItem key={order.id} className="d-flex justify-content-between align-items-center">
                        {new Date(order.createdAt).toDateString()} {order.status}
                    </ListGroupItem>
                ))}
            </ListGroup>
            <Button onClick={() => navigate('/')}>
                Return to shopping
            </Button>
        </Container>
    );
};

export default Orders;