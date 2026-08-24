import { knexSica } from "../../../db";
import { HpzPacienteInterface } from "../../../interfaces";

export const Paciente = {
    persona: async (parent: HpzPacienteInterface) => {
        const personaRow = parent.id_persona ? await knexSica('cmp_persona').where('id', '=', parent.id_persona).first() : null;
        return personaRow;
    }
};