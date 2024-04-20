import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkCpfIsAvaliable, checkEmailIsAvaliable, createCliente, deleteCliente, listClientes, readCliente, updateCliente } from './cliente.service';

const index = async (req: Request, res: Response) => {
    try {
        const cliente = await listClientes();
        res.status(StatusCodes.OK).json(cliente);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const cliente = req.body;
    try {
        if (await checkCpfIsAvaliable(cliente.cpf) && await checkEmailIsAvaliable(cliente.email)) {
            const novoCliente = await createCliente(cliente);
            res.status(StatusCodes.CREATED).json(novoCliente);
        } else {
            res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT);
        }
    } catch(err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const idNumber = parseInt(id, 10);
        const cliente = await readCliente(idNumber);
        if (!cliente) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        res.status(StatusCodes.OK).json(cliente);
    } catch(err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedCliente = req.body;
    try {
        const idNumber = parseInt(id, 10);
        const cliente = await updateCliente(idNumber, updatedCliente);
        if (!cliente) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        res.status(StatusCodes.OK).json(cliente);
    } catch(err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const idNumber = parseInt(id, 10);
        const result = await deleteCliente(idNumber);
        if (!result) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        res.status(StatusCodes.NO_CONTENT).json();
    } catch(err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
}

export default { index, create, read, update, remove };