const calcularTotaisOjecto = (objecto) => {
    console.log(objecto);
    objecto.calculateIVA();
    objecto.calculateTotalPrice();
    return objecto;
};

module.exports = calcularTotaisOjecto;
