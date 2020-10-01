const Manipulado = require('./manipulado');

const fct = require('../models/fatores.json');
const formasFarmaceuticas = require('../models/formas-farmaceuticas.json');

describe('Simple manipulado with only one mat prima and mat emb', function () {
    const mockedManipuladoSimple1x1 = {
        lote: 'lote2323',
        nomeManipulado: 'vaselina salicilada',
        fatorF: 4,
        utenteNome: 'Luis Peixoto',
        utenteContacto: 9349822,
        prescritorNome: 'Joao Paixao',
        prescritorContacto: 253623708,
        farmaceuticoNome: 'Joaquim Santos',
        farmaceuticoSupervisor: 'Marcelo Pereira',
        preparacao: 'Colocar na pedra de pomadas e espatular',
        conservacao: 'Local fresco ao abrigo do calor e humidade',
        validade: '2020-01-26',
        fFarmNome: 'pomada',
        fFarmPrice: 0.023,
        fFarmQtd: 80,
        materiasPrimas: [
            {
                id: 0,
                nome: 'asdfads',
                preco: 0.083,
                qtd: 1,
                fator: 'grama',
                valor: 956.8
            }
        ],
        materiasPrimasPrice: 1.03,
        materiaisEmbalagem: [
            {
                id: 0,
                nome: 'sadfa',
                capacidade: '80',
                preco: 0.8,
                qtd: 1,
                valor: 4
            }
        ],
        materiaisEmbalagemPrice: 2,
        validacoes: [
            {
                id: 0,
                nomeEnsaio: 'asdfasd',
                especificacao: 'adsfsad',
                resultado: 'adsfasdf'
            }
        ],
        IVA: 6,
        totalPrice: 60
    };

    testManipulado = new Manipulado(
        mockedManipuladoSimple1x1.lote,
        mockedManipuladoSimple1x1.nomeManipulado,
        mockedManipuladoSimple1x1.fatorF,
        mockedManipuladoSimple1x1.utenteNome,
        mockedManipuladoSimple1x1.utenteContacto,
        mockedManipuladoSimple1x1.prescritorNome,
        mockedManipuladoSimple1x1.prescritorContacto,
        mockedManipuladoSimple1x1.farmaceuticoNome,
        mockedManipuladoSimple1x1.farmaceuticoSupervisor,
        mockedManipuladoSimple1x1.preparacao,
        mockedManipuladoSimple1x1.conservacao,
        mockedManipuladoSimple1x1.validade,
        mockedManipuladoSimple1x1.fFarmNome,
        mockedManipuladoSimple1x1.fFarmQtd,
        mockedManipuladoSimple1x1.materiasPrimas,
        mockedManipuladoSimple1x1.materiaisEmbalagem,
        mockedManipuladoSimple1x1.validacoes
    );

    test('expect forma farmaceutica price to equal 12', () => {
        expect(testManipulado.calculateFFarmPrice(formasFarmaceuticas)).toBe(
            12
        );
    });

    test('expect materia prima price to equal 1.03', () => {
        expect(testManipulado.calculateMatPrimasTotalPrice(fct)).toBe(0.18);
    });

    test('expect  materiais embalagem price to equal 0.8', () => {
        expect(testManipulado.calculateMatEmbTotalPrice()).toBe(0.8);
    });

    test('expect semi total price equal 16.87', () => {
        expect(testManipulado.calculateSemiTotalPrice()).toBe(16.87);
    });

    test('expect total price to equal 15.97', () => {
        expect(testManipulado.calculateTotalPrice()).toBe(20.75);
    });

    test('expect IVA to equal 3.88', () => {
        expect(testManipulado.calculateIVA()).toBe(3.88);
    });
});

describe('Manipulado with 4 mat prima and 2 mat emb', function () {
    const mockedManipulado4x2 = {
        lote: 'lote2323',
        nomeManipulado: 'vaselina salicilada',
        fatorF: 4,
        utenteNome: 'Luis Peixoto',
        utenteContacto: 9349822,
        prescritorNome: 'Joao Paixao',
        prescritorContacto: 253623708,
        farmaceuticoNome: 'Joaquim Santos',
        farmaceuticoSupervisor: 'Marcelo Pereira',
        preparacao: 'Colocar na pedra de pomadas e espatular',
        conservacao: 'Local fresco ao abrigo do calor e humidade',
        validade: '2020-01-26',
        fFarmNome: 'pomada',
        fFarmPrice: 0.023,
        fFarmQtd: 80,
        materiasPrimas: [
            {
                id: 0,
                nome: 'asdfads',
                preco: 0.083,
                qtd: 1,
                fator: 'grama',
                valor: 956.8
            },
            {
                id: 2,
                nome: 'sfsdfs',
                preco: 0.083,
                qtd: 1,
                fator: 'grama',
                valor: 956.8
            },
            {
                id: 3,
                nome: 'retrete',
                preco: 0.083,
                qtd: 1,
                fator: 'grama',
                valor: 956.8
            },
            {
                id: 4,
                nome: 'yukyuky',
                preco: 0.083,
                qtd: 1,
                fator: 'grama',
                valor: 956.8
            }
        ],
        materiasPrimasPrice: 1.03,
        materiaisEmbalagem: [
            {
                id: 0,
                nome: 'sadfa',
                capacidade: '80',
                preco: 0.8,
                qtd: 1,
                valor: 4
            },
            {
                id: 1,
                nome: 'frefe',
                capacidade: '80',
                preco: 0.8,
                qtd: 1,
                valor: 4
            }
        ],
        materiaisEmbalagemPrice: 2,
        validacoes: [
            {
                id: 0,
                nomeEnsaio: 'asdfasd',
                especificacao: 'adsfsad',
                resultado: 'adsfasdf'
            }
        ],
        IVA: 6,
        totalPrice: 60
    };

    testManipulado2 = new Manipulado(
        mockedManipulado4x2.lote,
        mockedManipulado4x2.nomeManipulado,
        mockedManipulado4x2.fatorF,
        mockedManipulado4x2.utenteNome,
        mockedManipulado4x2.utenteContacto,
        mockedManipulado4x2.prescritorNome,
        mockedManipulado4x2.prescritorContacto,
        mockedManipulado4x2.farmaceuticoNome,
        mockedManipulado4x2.farmaceuticoSupervisor,
        mockedManipulado4x2.preparacao,
        mockedManipulado4x2.conservacao,
        mockedManipulado4x2.validade,
        mockedManipulado4x2.fFarmNome,
        mockedManipulado4x2.fFarmQtd,
        mockedManipulado4x2.materiasPrimas,
        mockedManipulado4x2.materiaisEmbalagem,
        mockedManipulado4x2.validacoes
    );

    test('expect forma farmaceutica price to equal 12', () => {
        expect(testManipulado2.calculateFFarmPrice(formasFarmaceuticas)).toBe(
            12
        );
    });

    test('expect materia prima price to equal 0.54', () => {
        expect(testManipulado2.calculateMatPrimasTotalPrice(fct)).toBe(0.73);
    });

    test('expect  materiais embalagem price to equal 1.6', () => {
        expect(testManipulado2.calculateMatEmbTotalPrice()).toBe(1.6);
    });

    test('expect semi total price equal 18.63', () => {
        expect(testManipulado2.calculateSemiTotalPrice()).toBe(18.63);
    });

    test('expect total price to equal 22.91', () => {
        expect(testManipulado2.calculateTotalPrice()).toBe(22.91);
    });

    test('expect IVA to equal 4.28', () => {
        expect(testManipulado2.calculateIVA()).toBe(4.28);
    });
});
