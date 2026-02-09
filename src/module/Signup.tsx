import {Component} from "react";
import {Navigate} from "react-router-dom";
import apiClient from "./AxiosApi";


const formatToDMY = (dateString:string|null) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            surname: "",
            email: "",
            password: "",
            birthDate: "",
            error: "",
            return: false
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const request = {
            name : this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            birthDate: formatToDMY(this.state.birthDate)
        }
        const userDetails = JSON.stringify(request);
        try {
            this.setState({ error: ""});
            await apiClient.post('/api/v1/access/signup/', userDetails);
            this.setState({return: true});
        }catch (error){
            console.log(error.message);
            this.setState({ error: error.message});
            this.render();
        }
    };

    render() {

        return (
            <div className="d-flex align-items-center loginBox">
                <form onSubmit={this.handleSubmit} className="form-signin bg-white">
                    <h3>Sign Up</h3>
                    <label>Name</label>
                    <input
                        type="text"
                        id="inputName"
                        className="form-control mt-4"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        placeholder="Name"
                        required
                    />
                    <label>Surname</label>
                    <input
                        type="text"
                        id="inputSurname"
                        className="form-control mt-4"
                        value={this.state.surname}
                        onChange={(e) => this.setState({ surname: e.target.value })}
                        placeholder="Surname"
                        required
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        placeholder="Email address"
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        id="inputPassword"
                        value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })}
                        className="form-control mb-2"
                        placeholder="Password"
                        required
                    />
                    <label>Date of birth</label>
                    <input
                        type="date"
                        id="inputDateOfBirth"
                        className="form-control mt-4"
                        value={this.state.birthDate}
                        onChange={(e) => this.setState({ birthDate: e.target.value })}
                        placeholder="Date of birth"
                        required
                    />
                    <div className="d-grid my-2">
                        <button type="submit" className="btn btn-primary btn-block mb-3">
                            SignUp
                        </button>
                    </div>
                    { this.state.error != "" && (<div className="invalid-feedback">
                        <span>{this.state.error}</span>
                    </div>)}
                    {
                        this.state.return ? <Navigate to="/" replace={true} /> : <></>
                    }
                </form>
            </div>
        );
    }
}