import App from './server';
import AuthRoute from './src/routes/auth.route';
import UsersRoute from './src/routes/users.route';
import IndexRoute from './src/routes/index.route';
import validateEnv from './src/utils/helpers/validateEnv';
import PaymentsRoute from './src/routes/payment.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UsersRoute(),
  new PaymentsRoute(),
]);

app.listen();

export default app