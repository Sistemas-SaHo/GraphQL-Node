export interface HpzIgresoSignosVitalesInterface {
    id: number;
    tension_arterial_sistolica: number;
    tension_arterial_diastolica: number;
    frecuencia_cardiaca: number;
    frecuencia_respiratoria: number;
    peso: number;
    talla: number;
    temperatura: number;
    uresis: number;
    glucemia_capilar: number;
    saturacion_parcial_oxigeno: number;
    cancelacion: string;
    id_ingreso: number;
    id_user: number;
    id_autorizo: number;
    id_cancelo: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}