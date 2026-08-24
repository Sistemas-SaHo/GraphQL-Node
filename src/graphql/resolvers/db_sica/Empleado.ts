import { knexSica, knexCe } from "../../../db";
import { RchEmpleadosInterface } from "../../../interfaces";

export const Empleado = {
    persona: async (parent: RchEmpleadosInterface) => {
        const personaRow = parent.id_persona ? await knexSica('cmp_persona').where('id', '=', parent.id_persona).first() : null;
        return personaRow;
    },
    turno: async (parent: RchEmpleadosInterface) => {
        const turnoRow = parent.id_turno ? await knexSica('cat_turnos').where('id', '=', parent.id_turno).first() : null;
        return turnoRow;
    },
    agendas: async (parent: RchEmpleadosInterface) => {
        const agendasRows = await knexCe('hpz_agendas').where('id_medico', '=', parent.id).whereNull('deleted_at');
        return agendasRows;
    }
};