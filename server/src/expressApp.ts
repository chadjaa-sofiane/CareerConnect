import express, { Application, Response, NextFunction } from "express";
import { join } from "path";

class App {
  private app: Application;
  private port: number;

  constructor(appInit: { port: number; middleWares?: any; routers?: any }) {
    this.app = express();
    this.port = appInit.port;
    this.setHeader();
    this.middlewares(appInit.middleWares);
    this.routes(appInit.routers);
    this.assets();
  }

  private setHeader() {
    this.app.use((_, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares?.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(routers: { forEach: (arg0: (router: any) => void) => void }) {
    routers?.forEach(({ path, router }) => {
      this.app.use(`/api/${path}`, router);
    });
  }

  private assets() {
    this.app.use(express.static(join(__dirname, "public")));
    this.app.use(express.static("views"));
  }
  get APP(){
    return this.app
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port:${this.port}`);
    });
  }
}
export default App;
