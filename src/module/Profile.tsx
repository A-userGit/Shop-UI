import {useEffect, useState} from "react";
import clientApi from "./AxiosApi";
import {Alert, Container} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import type {UserInfo} from "../Types.tsx";

const Profile = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserInfo|null>(null);

    useEffect(() => {
        clientApi.get("/api/v1/users/current/full").then((res) => {
            setUserData(res.data);
            if (!res.data) {
                throw new Error("User data retrieval error");
            }
            setError(null);
        })
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
            <h1>User Profile</h1>
            {userData&&(
                <>
                    <div>
                        Name {userData.name}
                    </div>
                    <div>
                        Surname {userData.surname}
                    </div>
                    <div>
                        Email {userData.email}
                    </div>
                    <div>
                        Date of birth {new Date(userData.birthDate).toDateString()}
                    </div>
                </>
            )}
            <Button onClick={() => navigate('/')}>
                Return to main page
            </Button>
        </Container>
    );
};

export default Profile;