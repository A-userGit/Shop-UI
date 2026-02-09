import {useAuthContext} from "react-oauth2-code-pkce";
import {useEffect, useState} from "react";
import apiClient from "./AxiosApi";
import type {SimpleUser} from "../Types.tsx";

const UserOptions = () => {
    const { token } = useAuthContext();
    const [apiData, setApiData] = useState<SimpleUser | null>(null);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        if (token) {
            apiClient.get("/api/v1/users/current").then((res) => {
                setApiData(res.data);
                if(!res.data){
                    throw new Error("User data retrieval error");
                }
                localStorage.setItem("email", res.data.email);
                setIsDataLoading(false);
            }).catch(error => console.error('Error fetching API data:', error));
        }
        }, [token]);
    return (
        <div>
            {isDataLoading ?
                <div>Loading...</div>
                :
                <div>
                    {apiData ? (
                        <pre>{apiData.name} {apiData.surname}</pre>
                    ) : (
                        <p>Auth error</p>
                    )}
                </div>
            }
        </div>
    );
};
export default UserOptions;