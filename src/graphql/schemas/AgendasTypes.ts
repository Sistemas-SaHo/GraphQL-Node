export const agendasTypes = `
    type HpzIngresoConsulta{
        id: Int!
        dx_informal: String
        tipo_cita: String
        estatus: String
        fecha_cita_inicio: DateTime
        fecha_cita_fin: DateTime
        observaciones: String
        id_medico: Int
        id_persona: Int
        id_paciente: Int
        id_especialidad: Int
        id_clue_referencia: Int
        created_at: DateTime
        updated_at: DateTime
        especialidad: Especialidad
        medico: Empleado
        persona: Persona
        paciente: Paciente
        clue_referencia: Clue
        historial: [HpzCitasHistorial]
        ingreso: Ingreso
        interpretaciones: [HpzInterpretaciones]
    }


    type HpzCitasHistorial{
        estatus: String
        created_at: DateTime
        id_user: Int
        user: User
    }


    type HpzAgendaHorarios{
        id: Int!
        dia: Int
        hora_inicio: Time
        hora_fin: Time
        limite: Int
    }


    type HpzAgendas{
        id: Int!
        fecha_inicio: Date
        fecha_fin: Date
        intervalo: String
        condiciones: String
        id_especialidad: Int
        id_medico: Int
        especialidad: Especialidad
        horarios: [HpzAgendaHorarios]
    }

    type HpzInterpretaciones{
        id: Int!
        tipo: String
        descripcion: String 
        id_cita: Int
        id_diagnostico: Int
        created_at: DateTime
        updated_at: DateTime
        deleted_at: DateTime
    }
`;