const calcularTotaisOjecto = (objecto) => {
    objecto.calculateIVA();
    objecto.calculateTotalPrice();
    return objecto;
};

module.exports = calcularTotaisOjecto;
