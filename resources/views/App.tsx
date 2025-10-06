import logo from "@/public/images/logo.svg";
import react from "@/public/images/react.svg";
import "@/public/index.css";
import {ApiTester} from "@/resources/views/ApiTester";

export function App() {
    return (
        <div className="app">
            <div className="logo-container">
                <img src={logo} alt="Bun Logo" className="logo bun-logo"/>
                <img src={react} alt="React Logo" className="logo react-logo"/>
            </div>

            <h1>Bun + React</h1>
            <p>Edit <code>resources/views/App.tsx</code> and save to test HMR</p>

            <ApiTester/>
        </div>
    );
}

export default App;
