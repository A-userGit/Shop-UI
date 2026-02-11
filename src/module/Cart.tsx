import {useEffect, useState} from "react";
import clientApi from "./AxiosApi";
import {Alert, Container, ListGroup, ListGroupItem} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import type {BasketItem, OrderCreationData, OrderItem} from "../Types.tsx";
import {CREATE_ORDER} from "../ApiRoutes.tsx";

const Cart = () => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null)
    const payForCart = () => {
        localStorage.removeItem("basket");
        const email = localStorage.getItem("email");
        if (!email) {
            throw new Error("No email found");
        }
        const items: OrderItem[] = basket.map(basketItem => {
            return {
                id: basketItem.item.id,
                amount: basketItem.amount
            };
        });
        const createOrderData: OrderCreationData = {
            email: email,
            items: items
        }
        createOrderData.email = email;
        try {
            clientApi.post(CREATE_ORDER, JSON.stringify(createOrderData));
            setError(null);
            navigate("/orders");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            console.log(err);
        }
    };

    const loadGoods = async () => {
        const strBasket = localStorage.getItem("basket");
        if (strBasket == null) {
            return[];
        } else {
             return JSON.parse(strBasket);
        }
    };

    const getSum = () => {
        return  basket.reduce((sum, product) => sum + product.amount*product.item.price, 0);
    }

    useEffect(() => {
        loadGoods().then(setBasket);
    }, []);

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h1>List of Goods</h1>
            <ListGroup>
                {basket.map((basketItem) =>(
                    <ListGroupItem key={basketItem.item.id} className="d-flex justify-content-between align-items-center">
                        {basketItem.item.name} {basketItem.item.price} {basketItem.amount}
                    </ListGroupItem>
                        ))}
            </ListGroup>
            <div>
                Total price {getSum()}
            </div>
            <Button onClick={() => payForCart()} disabled={basket.length<=0}>
                Pay for goods
            </Button>
        </Container>
    );
};

export default Cart;