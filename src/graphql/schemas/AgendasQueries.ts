export const AgendasQueries = `
    getAgendas(id_medico: Int, especialidades: String): [HpzAgendas]

    getEspecialidades(
        modulo: String, 
        estatus: String, 
        exclude: String, 
        medicos: String,
        end_date: String,
        start_date: String,
        via_ingreso: String,
        especialidades: String
    ): [Especialidad]

    getMedicos(limit: Int, text: String, modulo: String, estatus: String, exclude: String, medicos: String, end_date: String, start_date: String, especialidades: String): [Empleado]

    countHpzIngresoConsulta(
        estatus: String, end_date: String, radio_fecha: Int, start_date: String, switch_fecha: String, especialidades: String, via_ingreso: String, id_medico: Int, id_paciente: Int, id_especialidad: Int
    ): totalRows

    getHpzIngresoConsulta(
        page: Int,
        page_size: Int,
        estatus: String,
        end_date: String,
        radio_fecha: Int,
        start_date: String,
        via_ingreso: String,
        switch_fecha: String,
        especialidades: String,
        id_medico: Int,
        id_paciente: Int,
        id_especialidad: Int
    ): [HpzIngresoConsulta]
`;