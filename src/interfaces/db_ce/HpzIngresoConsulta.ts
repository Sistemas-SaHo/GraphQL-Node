import { TableParamsInterface } from "../GeneralInterface";

export interface ParamsHpzIngresoConsultaInterface extends TableParamsInterface {
    estatus: string;
    start_date: string;
    end_date: string;
    id_medico: string;
    id_especialidad: string;
    id_paciente: string;
    tipo_agenda: string;
    radio_fecha: string;
    switch_fecha: string;
    especialidades?: string;
    reverse: string;
    movimiento: string;
    full_calendar: string;
    via_ingreso: string;
}

export interface HpzIngresoConsultaInterface {
    id: number;
    via_ingreso: string;
    dx_informal: string;
    tipo_cita: string;
    fecha_cita_inicio: string;
    fecha_cita_fin: string;
    estatus: string;
    observaciones: string;
    id_persona: number;
    id_paciente: number;
    id_especialidad: number;
    id_medico: number;
    id_clue_referencia: number;
    id_ingreso: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}