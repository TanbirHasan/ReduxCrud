import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transaction from "./components/Transactions/Transaction";

function App() {
  return (
    <div className="App">
      <Layout>
        <Balance />
        <Form />
        <Transaction />
      </Layout>
    </div>
  );
}

export default App;
