import Query from "./Query";
import { Empleado, Especialidad, Paciente, Persona } from "./db_sica";
import { HpzAgendas, HpzCitasHistorial, HpzIngresoConsulta } from "./db_ce";
import { DateScalar as Date, DateTimeScalar as DateTime, TimeScalar as Time } from "../scalars";

export const resolvers = {
    Date,
    Time,
    DateTime,
    Query,
    Empleado,
    Especialidad,
    Paciente,
    Persona,
    HpzAgendas,
    HpzCitasHistorial,
    HpzIngresoConsulta
};