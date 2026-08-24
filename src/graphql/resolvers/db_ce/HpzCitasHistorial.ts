import { knexSica } from "../../../db";
import { HpzCitasHistorialInterface } from "../../../interfaces";

export const HpzCitasHistorial = {
    user: async (parent: HpzCitasHistorialInterface) => {
        const userRow = parent.id_user ?
            await knexSica('users').select('id', 'name', 'username', 'email').where('id', '=', parent.id_user).first()
            : null;
        return userRow;
    }
};