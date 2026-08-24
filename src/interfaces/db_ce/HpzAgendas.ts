export interface HpzAgendasInterface {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    intervalo: string;
    condiciones: string[];
    id_medico: number;
    id_especialidad: number;
    created_at: number;
    updated_at: number;
    deleted_at: number;
}