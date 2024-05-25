const { firstName, verifyStockAvailability, calculateTotalPrice } = require('../utils/validations');

describe('Função firstName', () => {
  it('deve retornar o primeiro nome quando houver espaço em branco', () => {
    expect(firstName('Ademar Alves Castro Filho')).toBe('Ademar');
  });

  it('deve retornar o nome completo se não houver espaço em branco', () => {
    expect(firstName('Ademar')).toBe('Ademar');
  });
});

describe('Função verifyStockAvailability', () => {
  it('deve retornar true se o produto estiver disponível', () => {
    expect(verifyStockAvailability('laptop', 1)).toBeTruthy();
  });

  it('deve retornar false ao exceder a quantidade disponível no estoque', () => {
    expect(verifyStockAvailability('smartphone', 30)).toBeFalsy();
  });

  it('deve retornar false se o produto não estiver disponível', () => {
    expect(verifyStockAvailability('book', 1)).toBeFalsy();
  });
});

describe('Função calculateTotalPrice', () => {
  it('deve calcular o preço total corretamente', () => {
    const products = 
    [
        { name: 'Laptop', price: 1000, quantity: 1 },
        { name: 'Smartphone', price: 500, quantity: 2 },
    ]
    expect(calculateTotalPrice(products)).toBe(2000);
  });
});