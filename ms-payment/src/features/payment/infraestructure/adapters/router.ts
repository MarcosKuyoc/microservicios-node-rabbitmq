import express from 'express';
class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRouter();
  }

  private mountRouter() {
    this.router.post('/register', ()=> { console.log('register')});
    this.router.post('/login', ()=> { console.log('login')});
    this.router.post('/validate-access-token', ()=> { console.log('validate access token')});
    this.router.post('/new-access-token', ()=> { console.log('generar un nuevo token')});
  }
}

export default new Router().router;