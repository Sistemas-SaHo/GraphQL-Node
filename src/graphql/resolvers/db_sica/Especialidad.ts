import { knexSica } from "../../../db";
import { CatEspecialidadesInterface } from "../../../interfaces";

export const Especialidad = {
    servicio: async (parent: CatEspecialidadesInterface) => {
        const servicioRow = parent.id_servicio ? await knexSica('cat_servicios').where('id', '=', parent.id_servicio).first() : null;
        return servicioRow;
    }
};