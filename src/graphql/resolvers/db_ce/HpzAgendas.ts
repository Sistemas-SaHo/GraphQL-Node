import { knexSica, knexCe } from "../../../db";
import { HpzAgendasInterface } from "../../../interfaces";

export const HpzAgendas = {
    especialidad: async (parent: HpzAgendasInterface) => {
        const especialidadRow = parent.id_especialidad ? await knexSica('cat_especialidades').where('id', '=', parent.id_especialidad).first() : null;
        return especialidadRow;
    },
    horarios: async (parent: HpzAgendasInterface) => {
        const horariosRows = await knexCe('hpz_agendas_horarios').where('id_agenda', '=', parent.id).whereNull('deleted_at');
        return horariosRows;
    }
};