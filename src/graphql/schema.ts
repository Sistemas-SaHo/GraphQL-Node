import { AgendasQueries, agendasTypes } from "./schemas";

const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar Date
    scalar Time
    scalar DateTime


    ${agendasTypes}

    
    type Ingreso{
        id: Int!
        fecha_ingreso: DateTime
    }


    type Especialidad{
        id: Int!
        nombre: String
        tipo: String
        cve_sinba: String
        esp_sinba: String
        id_servicio: Int
        servicio: Servicio!
    }


    type Servicio{
        id: Int!
        nombre: String
    }


    type Paciente{
        id: Int!
        expediente: String
        id_persona: Int
        persona: Persona
    }

    
    type Empleado{
        id: Int!
        matricula: Int
        id_persona: Int
        persona: Persona
        turno: Turno
        agendas: [HpzAgendas]
    }
    

    type Persona{
        id: Int!
        sexo: String
        curp: String
        nombres: String
        primer_apellido: String
        segundo_apellido: String
        fecha_defuncion: Date
        contactos: [Contacto]
        paciente: Paciente
    }

    
    type Contacto{
        id: Int!
        tipo: String
        descripcion: String
    }


    type Clue{
        id: Int!
        nom_uni: String
    }


    type Turno{
        id: Int!
        nombre: String
    }


    type User{
        id: Int!
        name: String
        username: String
        email: String
    }


    type totalRows{
        total: Int
    }

    
    type Query {
        ${AgendasQueries}
    }
`;

export { typeDefs };