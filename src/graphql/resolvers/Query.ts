import moment from "moment";
import { knexCe, knexSica } from "../../db";
import { ParamsCatInterface, ParamsHpzIngresoConsultaInterface } from "../../interfaces";

export default {
    // CATALOGOS
    getMedicos: async (_: unknown, filters: ParamsCatInterface) => {
        let array_medicos: number[] = [];
        const year = moment().year() - 1;
        const auxEstatus = filters.estatus?.split(',').filter(Boolean).map(String) ?? [];
        const auxMedicos = filters.medicos?.split(',').filter(Boolean).map(Number) ?? [];
        const auxEspecialidades = filters.especialidades?.split(',').filter(Boolean).map(Number) ?? [];

        switch (filters.modulo) {
            case 'agenda':
                const ids_medicos_agenda = await knexCe('hpz_agendas').select('id_medico').whereNull('deleted_at').whereIn('id_especialidad', auxEspecialidades).groupBy('id_medico');
                array_medicos = [...new Set(ids_medicos_agenda.map((value) => value.id_medico))];
                break;
            case 'citas':
                let query_citas = knexCe('hpz_ingreso_consulta').select('id_medico').where('id_medico', '>', 0);
                query_citas = auxEstatus.length > 0 ? query_citas.whereIn('estatus', auxEstatus) : query_citas.whereNotIn('estatus', ['DESHABILITADO', 'BASURA']);

                if (auxEspecialidades.length > 0) query_citas = query_citas.whereIn('id_especialidad', auxEspecialidades);

                if (filters.start_date && filters.end_date) {
                    query_citas = query_citas.whereBetween('fecha_cita_inicio', [filters.start_date, `${filters.end_date} 23:59:59`]);
                } else {
                    query_citas.where('updated_at', '>=', `${year}-01-01 00:00:00`);
                }
                const ids_medicos_citas = await query_citas.groupBy('id_medico');
                array_medicos = [...new Set(ids_medicos_citas.map((value) => value.id_medico))];
                break;
            case 'empleados':
                array_medicos = [...new Set(auxMedicos)];
            default:
                break;
        }

        let query_medico = knexSica('rch_empleados as e').select('e.*')
            .leftJoin('cmp_persona as p', 'p.id', 'e.id_persona').where('e.activo', '=', 1).whereNull('e.deleted_at');

        if (isNaN(Number(filters.text)) && filters.text.length > 0) {
            query_medico = query_medico.whereRaw("CONCAT_WS(' ', p.primer_apellido, p.segundo_apellido, p.nombres) LIKE ?", [`%${filters.text}%`]);
        } else if (!isNaN(Number(filters.text)) && filters.text.length > 0) {
            query_medico = query_medico.where('e.matricula', 'LIKE', `%${filters.text}%`);
        }

        query_medico = filters.exclude === 'false' ? query_medico.whereIn('e.id', array_medicos) : query_medico.whereNotIn('e.id', array_medicos);

        if (filters.limit > 0) query_medico = query_medico.limit(filters.limit);

        return await query_medico.orderByRaw("CONCAT_WS(' ', p.primer_apellido, p.segundo_apellido, p.nombres) ASC");
    },
    getEspecialidades: async (_: unknown, filters: ParamsCatInterface) => {
        const year = moment().year() - 1;
        let array_especialidades: number[] = [];
        const auxEstatus = filters.estatus?.split(',').filter(Boolean).map(String) ?? [];
        const auxMedicos = filters.medicos?.split(',').filter(Boolean).map(Number) ?? [];
        const auxEspecialidades = filters.especialidades?.split(',').filter(Boolean).map(Number) ?? [];

        switch (filters.modulo) {
            case 'agenda':
                let query_agenda = knexCe('hpz_agendas').select('id_especialidad').whereNull('deleted_at');

                if (auxMedicos.length > 0) query_agenda = query_agenda.whereIn('id_medico', auxMedicos);

                if (auxEspecialidades.length > 0) query_agenda = query_agenda.whereIn('id_especialidad', auxEspecialidades);

                const ids_especialidades_agenda = await query_agenda.groupBy('id_especialidad');
                array_especialidades = [...new Set(ids_especialidades_agenda.map((value) => value.id_especialidad))];
                break;
            case 'citas':
                let query_citas = knexCe('hpz_ingreso_consulta').select('id_especialidad').where('id_especialidad', '>', 0);
                query_citas = auxEstatus.length > 0 ? query_citas.whereIn('estatus', auxEstatus) : query_citas.whereNotIn('estatus', ['DESHABILITADO', 'BASURA']);
                query_citas = (filters.start_date && filters.end_date) ?
                    query_citas.whereBetween('fecha_cita_inicio', [filters.start_date, `${filters.end_date} 23:59:59`])
                    : query_citas.where('updated_at', '>=', `${year}-01-01 00:00:00`);

                if (auxMedicos.length > 0) query_citas = query_citas.whereIn('id_medico', auxMedicos);

                if (auxEspecialidades.length > 0) query_citas = query_citas.whereIn('id_especialidad', auxEspecialidades);

                const ids_especialidades_citas = await query_citas.groupBy('id_especialidad');
                array_especialidades = [...new Set(ids_especialidades_citas.map((value) => value.id_especialidad))];
                break;
            case 'especialidades':
                array_especialidades = [...new Set(auxEspecialidades)];
                break;
            default:
                break;
        }


        let query_especialidades = knexSica('cat_especialidades');
        query_especialidades = filters.exclude === 'false' ? query_especialidades.whereIn('id', array_especialidades) : query_especialidades.whereNotIn('id', array_especialidades);
        query_especialidades = filters.via_ingreso.length > 0 ? query_especialidades.where('tipo', '=', filters.via_ingreso) : query_especialidades.whereNull('tipo');
        return await query_especialidades.orderBy('nombre', 'asc');
    },
    // AGENDAS
    getAgendas: async (_: unknown, { id_medico = -1, especialidades = '' }: { id_medico: number; especialidades: string; }) => {
        const auxEspecialidades = especialidades.split(',').filter(Boolean).map(Number) ?? [];
        const agendas = await knexCe('hpz_agendas').where('id_medico', '=', id_medico).whereIn('id_especialidad', auxEspecialidades).whereNull('deleted_at');
        return agendas;
    },
    // INGRESO CONSULTA
    getHpzIngresoConsulta: async (_: unknown, filters: ParamsHpzIngresoConsultaInterface) => {
        const year = moment().year() - 1;
        let query = knexCe('hpz_ingreso_consulta').whereNull('deleted_at')
        const auxEspecialidades = filters.especialidades?.split(',').filter(Boolean).map(Number) ?? [];
        const auxEstatus = filters.estatus?.split(',').filter(Boolean).map(value => value.trim()) ?? [];
        const page_init = ((Number(filters.page) * Number(filters.page_size)) - Number(filters.page_size));
        const auxViaIngreso = filters.via_ingreso?.split(',').filter(Boolean).map(item => String(item).trim()) ?? [];
        query = auxViaIngreso.length > 0 ? query.whereIn('via_ingreso', auxViaIngreso) : query.whereNotIn('via_ingreso', ['TRIAGE']);

        if (Number(filters.id_medico) > 0) query = query.where('id_medico', '=', filters.id_medico);

        if (Number(filters.id_paciente) > 0) query = query.where('id_paciente', '=', filters.id_paciente);

        if (filters.switch_fecha === 'true') {
            const column = Number(filters.radio_fecha) === 0 ? 'fecha_cita_inicio' : 'created_at';
            query = query.whereBetween(column, [filters.start_date, `${filters.end_date} 23:59:59`]).orderBy(column, 'ASC');
        } else if (filters.switch_fecha === 'otros') {
            query = query.where('fecha_cita_inicio', '>=', filters.start_date);
        } else {
            query = query.where('updated_at', '>=', `${year}-01-01 00:00:00`).orderBy('updated_at', 'DESC');
        }

        query = auxEstatus.length > 0 ? query.whereIn('estatus', auxEstatus) : query.whereNotIn('estatus', ['DESHABILITADO', 'BASURA']);
        query = Number(filters.id_especialidad) > 0 ? query.where('id_especialidad', '=', filters.id_especialidad) : query.whereIn('id_especialidad', auxEspecialidades);

        if (Number(filters.page_size) > 0) query = query.offset(page_init).limit(Number(filters.page_size));

        return await query;
    },
    countHpzIngresoConsulta: async (_: unknown, filters: ParamsHpzIngresoConsultaInterface) => {
        const year = moment().year() - 1;
        let query = knexCe('hpz_ingreso_consulta').count('id as total').whereNull('deleted_at');
        const auxEspecialidades = filters.especialidades?.split(',').filter(Boolean).map(Number) ?? [];
        const auxEstatus = filters.estatus?.split(',').filter(Boolean).map(value => value.trim()) ?? [];
        const auxViaIngreso = filters.via_ingreso?.split(',').filter(Boolean).map(item => String(item).trim()) ?? [];
        query = auxViaIngreso.length > 0 ? query.whereIn('via_ingreso', auxViaIngreso) : query.whereNotIn('via_ingreso', ['TRIAGE']);

        if (Number(filters.id_medico) > 0) query = query.where('id_medico', '=', filters.id_medico);

        if (Number(filters.id_paciente) > 0) query = query.where('id_paciente', '=', filters.id_paciente);

        if (filters.switch_fecha === 'true') {
            const column = Number(filters.radio_fecha) === 0 ? 'fecha_cita_inicio' : 'created_at';
            query = query.whereBetween(column, [filters.start_date, `${filters.end_date} 23:59:59`]).orderBy(column, 'ASC');
        } else if (filters.switch_fecha === 'otros') {
            query = query.where('fecha_cita_inicio', '>=', filters.start_date);
        } else {
            query = query.where('updated_at', '>=', `${year}-01-01 00:00:00`).orderBy('updated_at', 'DESC');
        }

        query = auxEstatus.length > 0 ? query.whereIn('estatus', auxEstatus) : query.whereNotIn('estatus', ['DESHABILITADO', 'BASURA']);
        query = Number(filters.id_especialidad) > 0 ? query.where('id_especialidad', '=', filters.id_especialidad) : query.whereIn('id_especialidad', auxEspecialidades);

        return await query.first();
    }
};