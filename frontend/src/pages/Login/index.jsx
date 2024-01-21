import { useState, useEffect } from "react";
import { useLoginMutation } from "../../utilities/api/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { isLoading, error, data }] = useLoginMutation();
    
    const submitLogin = (e) => {
        e.preventDefault();

        const loginData = { email, password, };

        login(loginData)

        
    }
	
    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message);
        }
    })

	return (
		<div>
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow rounded bg-body"
						onSubmit={submitLogin}
					>
						<h2 className="mb-4">Login</h2>
						<div className="mb-3">
							<label htmlFor="email_field" className="form-label">
								Email
							</label>
							<input
								type="email"
								id="email_field"
								className="form-control"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="mb-3">
							<label
								htmlFor="password_field"
								className="form-label"
							>
								Password
							</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							id="login_button"
							type="submit"
							className="btn w-100 py-2"
							disabled={isLoading}>
						
							{isLoading ? "Authenticating User..." : "LOGIN"}
						</button>

						<div className="my-3">
							<Link to="/register" className="float-end">
								New User?
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
