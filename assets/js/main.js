function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '')
        }
    })
}

ValidaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false
    if(this.isSequencia()) return false

    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1)

    const novoCpf = cpfParcial + digito1 + digito2

    return novoCpf === this.cpfLimpo
}

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArrey = Array.from(cpfParcial)

    let regressivo = cpfArrey.length + 1;
    const total = cpfArrey.reduce((ac, val) => {
        ac += (regressivo * Number(val))
        regressivo--;
        return ac
    }, 0)
    
    const digito = 11 - (total % 11)
    return digito > 9 ? '0' : String(digito);
    
}

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}

function limparResultado() {
    const paragrafosAntigos = document.querySelectorAll('.resultado-cpf');
    paragrafosAntigos.forEach(paragrafo => paragrafo.remove());
}

const inputCPF = document.querySelector('#input-teste-1')
const verificar = document.querySelector('.btn')

verificar.addEventListener('click', function(event) {
    event.preventDefault();

    const valorDigitado = inputCPF.value.replace(/\D+/g, '');
    const cpf = new ValidaCPF(valorDigitado);

    limparResultado();

    const resultado = document.createElement('p');

    if (cpf.valida()) {
        resultado.textContent = 'CPF válido';
        resultado.style.color = 'green';
    } else {
        resultado.textContent = 'CPF inválido';
        resultado.style.color = 'red';
    }

    const paragrafosAntigos = document.querySelectorAll('.resultado-cpf');
    paragrafosAntigos.forEach(paragrafo => paragrafo.remove());

    resultado.classList.add('resultado-cpf');
    document.querySelector('.container').appendChild(resultado);
});

inputCPF.addEventListener('input', function() {
    let valorAtual = inputCPF.value.replace(/\D+/g, ''); 
    const cpfFormatado = valorAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    inputCPF.value = cpfFormatado;
});



