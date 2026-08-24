import { knexSica, knexCe } from "../../../db";
import { HpzIngresoConsultaInterface } from "../../../interfaces";

export const HpzIngresoConsulta = {
    clue_referencia: async (parent: HpzIngresoConsultaInterface) => {
        const clueRow = parent.id_clue_referencia ? await knexSica('cat_clues').where('id', '=', parent.id_clue_referencia).first() : null;
        return clueRow;
    },
    especialidad: async (parent: HpzIngresoConsultaInterface) => {
        const especialidadRow = parent.id_especialidad ? await knexSica('cat_especialidades').where('id', '=', parent.id_especialidad).first() : null;
        return especialidadRow;
    },
    historial: async (parent: HpzIngresoConsultaInterface) => {
        const historialRows = await knexCe('hpz_citas_historial').where('id_cita', '=', parent.id).orderBy('created_at', 'DESC');
        return historialRows;
    },
    ingreso: async (parent: HpzIngresoConsultaInterface) => {
        const ingresoRow = parent.id_ingreso ? await knexSica('hpz_ingreso_hospitalario').where('id', '=', parent.id_ingreso).first() : null;
        return ingresoRow;
    },
    interpretaciones: async (parent: HpzIngresoConsultaInterface) => {
        const interpretacionesRows = parent.id ? await knexCe('hpz_interpretaciones').where('id_cita', '=', parent.id).orderBy('created_at', 'DESC') : null;
        return interpretacionesRows;
    },
    medico: async (parent: HpzIngresoConsultaInterface) => {
        const medicoRow = parent.id_medico ? await knexSica('rch_empleados').where('id', '=', parent.id_medico).first() : null;
        return medicoRow;
    },
    paciente: async (parent: HpzIngresoConsultaInterface) => {
        const pacienteRow = parent.id_paciente ? await knexSica('hpz_paciente').where('id', '=', parent.id_paciente).first() : null;
        return pacienteRow;
    },
    persona: async (parent: HpzIngresoConsultaInterface) => {
        const personaRow = parent.id_persona ? await knexSica('cmp_persona').where('id', '=', parent.id_persona).first() : null;
        return personaRow;
    }
};