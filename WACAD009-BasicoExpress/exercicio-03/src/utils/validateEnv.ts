import { cleanEnv, port, str } from 'envalid';

const validateEnv = () : void => {
    cleanEnv(process.env, {
        PORT: port(),
        NODE_ENV: str()
    });
};

export default validateEnv;