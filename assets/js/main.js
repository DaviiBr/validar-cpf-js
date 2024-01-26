class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        })
    }

        isSequence() {
            return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
        }

        geraNovoCpf() {
            const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
            const digito1 = ValidaCPF.geraDigito(cpfSemDigitos);
            const digito2 = ValidaCPF.geraDigito(cpfSemDigitos + digito1);
            this.novoCPF = cpfSemDigitos + digito1 + digito2;
        }

        static geraDigito(cpfSemDigitos) {
            let total = 0
            let reverso = cpfSemDigitos.length + 1

            for(let stringNumerica of cpfSemDigitos) {
                total += reverso * Number(stringNumerica)
                reverso--;
            }

            const digito = 11 - (total % 11)
            return digito <= 9 ? String(digito) : '0';
        }

        valida() {
            if(!this.cpfLimpo) return false;
            if(typeof this.cpfLimpo !== 'string') return false;
            if(this.cpfLimpo.length !== 11) return false;
            if(this.isSequence()) return false;
            this.geraNovoCpf()

            return this.novoCPF === this.cpfLimpo
        }
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
    
    // Atualizar a instância cpfLimpo com o valor atualizado
    cpf.cpfLimpo = valorAtual;

    const cpfFormatado = valorAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    inputCPF.value = cpfFormatado;
});



