import moment from 'moment';
import { GraphQLScalarType, Kind } from 'graphql';

const OFFSET_HOURS = -5;

const applyOffset = (value: unknown) => {
    if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
        const m = moment.utc(value).utcOffset(OFFSET_HOURS * 60);
        if (!m.isValid()) throw new TypeError(`Valor inválido: ${value}`);
        return m;
    }
    throw new TypeError(`No puede serializar: ${typeof value}`);
};

export const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Fecha sin hora (YYYY-MM-DD)',
    serialize(value: unknown): string {
        return applyOffset(value).format('YYYY-MM-DD');
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string') {
            const m = moment(value, 'YYYY-MM-DD', true);
            if (!m.isValid()) throw new TypeError(`Date inválido: ${value}`);
            return m.format('YYYY-MM-DD');
        }
        throw new TypeError(`Date esperaba string, recibió: ${typeof value}`);
    },
    parseLiteral(ast): string | null {
        if (ast.kind === Kind.STRING) {
            const m = moment(ast.value, 'YYYY-MM-DD', true);
            return m.isValid() ? m.format('YYYY-MM-DD') : null;
        }
        return null;
    }
});

export const TimeScalar = new GraphQLScalarType({
    name: 'Time',
    description: 'Hora sin fecha (HH:mm:ss)',
    serialize(value: unknown): string {
        if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
            const m = moment(value, 'HH:mm:ss');
            if (!m.isValid()) throw new TypeError(`Time inválido: ${value}`);
            return m.format('HH:mm:ss');
        }
        throw new TypeError(`Time no puede serializar: ${typeof value}`);
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string') {
            const m = moment(value, 'HH:mm:ss');
            if (!m.isValid()) throw new TypeError(`Time inválido: ${value}`);
            return m.format('HH:mm:ss');
        }
        throw new TypeError(`Time esperaba string, recibió: ${typeof value}`);
    },
    parseLiteral(ast): string | null {
        if (ast.kind === Kind.STRING) {
            const m = moment(ast.value, 'HH:mm:ss');
            return m.isValid() ? m.format('HH:mm:ss') : null;
        }
        return null;
    }
});

export const DateTimeScalar = new GraphQLScalarType({
    name: 'DateTime',
    description: 'Fecha y hora (YYYY-MM-DD HH:mm:ss) en UTC-5',
    serialize(value: unknown): string {
        return applyOffset(value).format('YYYY-MM-DD HH:mm:ss');
    },
    parseValue(value: unknown): string {
        if (typeof value === 'string') {
            const m = moment.utc(value).utcOffset(OFFSET_HOURS * 60);
            if (!m.isValid()) throw new TypeError(`DateTime inválido: ${value}`);
            return m.utc().format('YYYY-MM-DD HH:mm:ss');
        }
        throw new TypeError(`DateTime esperaba string, recibió: ${typeof value}`);
    },
    parseLiteral(ast): string | null {
        if (ast.kind === Kind.STRING) {
            const m = moment.utc(ast.value).utcOffset(OFFSET_HOURS * 60);
            return m.isValid() ? m.utc().format('YYYY-MM-DD HH:mm:ss') : null;
        }
        return null;
    }
});