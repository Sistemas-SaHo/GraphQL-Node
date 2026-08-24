import { knexSica } from "../../../db";
import { CmpPersonaInterface } from "../../../interfaces";

export const Persona = {
    contactos: async (parent: CmpPersonaInterface) => {
        const contactosRows = parent.id ? await knexSica('cmp_contactos').where('id_persona', '=', parent.id).whereNull('deleted_at') : null;
        return contactosRows;
    },
    paciente: async (parent: CmpPersonaInterface) => {
        const pacienteRow = parent.id ? await knexSica('hpz_paciente').where('id_persona', '=', parent.id).first() : null;
        return pacienteRow;
    }
};
