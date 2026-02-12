import {useEffect, useState} from "react";
import clientApi from "./AxiosApi";
import {ListGroup, Container, Alert, Spinner, ListGroupItem} from 'react-bootstrap';
import {useAuthContext} from "react-oauth2-code-pkce";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import type {BasketItem, Item} from "../Types";
import {AVAILABLE_ITEMS} from "../ApiRoutes.tsx";

const Dashboard = () => {
    const {token} = useAuthContext();
    const [goods, setGoods] = useState<Item[]>([]);
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const updateOrAddItem = (newItem:Item, amount: number) => {
        const itemIndex = basket.findIndex(basketItem => basketItem.item.id === newItem.id);
        if (itemIndex > -1) {
            if(basket[itemIndex].amount + amount <=0) {
                const updatedBasketItems = basket.filter(basketItem => basketItem.item.id !== newItem.id);
                setBasket(updatedBasketItems);
            }else{
                const updatedBasketItems = basket.map(basketItem => {
                    if (basketItem.item.id === newItem.id) {
                        return { ...basketItem, amount: basketItem.amount + amount };
                    }
                    return basketItem;
                });
                setBasket(updatedBasketItems);
            }

        } else if(amount>0){
            const newBasketItem = { item: newItem, amount: amount};
            setBasket(prevItems => [...prevItems, newBasketItem]);
        }
    };

    const getSelectedCount = (itemId:bigint) => {
        const itemIndex = basket.findIndex(basketItem => basketItem.item.id === itemId);
        if (itemIndex <= -1) {
            return 0
        } else if(basket[itemIndex]){
            return basket[itemIndex].amount;
        }
    };

    const goToCart = () => {
        localStorage.removeItem("basket");
        localStorage.setItem("basket", JSON.stringify(basket));
        navigate("/cart")
    };



    useEffect(() => {
        const fetchGoods = async () => {
            try {
                const response = await clientApi.get(AVAILABLE_ITEMS);
                setGoods(response.data.slice(0, 5));
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

        fetchGoods();
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
            <h1>List of Goods</h1>
                <ListGroup>
                    {goods.map((item) =>(
                    <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center">
                        {item.name} {item.price} {token&&(
                            <><Button variant="primary" onClick={() => updateOrAddItem(item, 1)}>
                                Add
                            </Button>
                        <div>{getSelectedCount(item.id)}</div>
                            <Button onClick={() => updateOrAddItem(item, -1)}>
                                Remove
                            </Button></>)}
                    </ListGroupItem>
                        ))}
                </ListGroup>
                {token&&(<Button onClick={() => goToCart()} disabled={basket.length<=0}>
                        Go to cart
                        </Button>)}
        </Container>
    );
};

export default Dashboard;