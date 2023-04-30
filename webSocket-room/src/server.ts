import { serverHttp } from "./http";
import './websocket';


serverHttp.listen(5000, () => console.log('Server is running on PORT 5000'))