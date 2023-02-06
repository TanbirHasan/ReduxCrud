import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transaction from "./components/Transactions/Transaction";
import Transactions from "./components/Transactions/Transactions";
function App() {
  return (
    <div className="App">
      <Layout>
        <Balance />
        <Form />
        <Transactions />
      </Layout>
    </div>
  );
}

export default App;
