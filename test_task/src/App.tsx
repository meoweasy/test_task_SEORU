import HomePage from './HomePage';
import { Helmet } from "react-helmet";

function App() {

  return (
    <>
      <Helmet>
        <title>
          Тестовое задание на должность Web-мастер/Младший Web-разработчик
        </title>
        <meta
          name="description"
          content="На этой странице отображен результат тестового задания"
        />
      </Helmet>
      <HomePage />
    </>
  );
}

export default App
