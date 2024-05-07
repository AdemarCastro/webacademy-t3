import { Request, Response } from "express";
import { buscarUsuarioPorEmail, createUsuario } from "../usuario/usuario.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCredentialsAdmin, checkCredentialsAuth } from "./auth.service";
import { TiposUsuarios } from "../tipoUsuario/tipoUsuario.constants";
import { LoginDto, SignDto } from "./auth.types";

const signup = async (req: Request, res: Response) => {
    const usuario = req.body as SignDto;
    /*
    #swagger.summary = "Registro de novos usuários."
    #swagger.parameters['body'] = {
    in: 'body',
    schema: { $ref: '#/definitions/SignDto' }
    }
    #swagger.responses[201] = {
    schema: { $ref: '#/definitions/UsuarioDto'}
    }
    */
    try {
        if (await buscarUsuarioPorEmail(usuario.email)) {
            return res.
                status(StatusCodes.BAD_REQUEST)
                .json({ msg: 'Email informado já está sendo usado.' });
        }
        const novoUsuario = await createUsuario({
            ...usuario,
            tipoUsuarioId: TiposUsuarios.CLIENT,
        });
        res.status(StatusCodes.CREATED).json(novoUsuario);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const login = async (req: Request, res: Response) => {
    const credentials = req.body as LoginDto;
    /*
    #swagger.summary = "Autentificação de usuários."
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/LoginDto' }
    }
    #swagger.responses[200] = {
    schema: { $ref: '#/definitions/'}
    }
    */
    try {
        // Checa se o usuário existe no sistema
        const usuario = await checkCredentialsAuth(credentials)
        if (!usuario) return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Email ou senha incorretos"});
        
        // Determina se o usuário é um Administrador
        req.session.uid = usuario.id;
        const isAdmin = await checkCredentialsAdmin(usuario.id);

        res.status(StatusCodes.OK).json({ msg: "Usuário autenticado", isAdmin})
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
};

const logout = async (req: Request, res: Response) => {
    /*
    #swagger.summary = "Logout."
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/'}
    }  
    */
    if (req.session.uid) {
        req.session.destroy((err) => {
            if (err) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            res.status(StatusCodes.OK).json({ msg: "Usuário deslogado..."})
        });
    } else {
        console.log(req.session.uid);
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Não há usuário autenticado"})
    }
};

export default { signup, login, logout };