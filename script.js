let title = document.querySelector('.title')
let labelInpt = document.querySelector('.labelInpt')
let inpt = document.querySelector('.inpt')
let out = document.querySelector('.out')

let changeButton = document.querySelector('.change')
changeButton.addEventListener('click', changeAction)

let convertButton = document.querySelector('.conv')
convertButton.addEventListener('click', action)

let copyButton = document.querySelector('.copy')
copyButton.addEventListener('click', copy)

function dectobin(){
    if (verify(inpt.value)) {
        return
    } else {
        let binary = []
        let quo = inpt.value
        
        while (quo > 1) {
            binary.push(quo % 2)
            quo = parseInt(quo / 2)
        }
        
        binary.push(quo)
        binary.reverse()
        
        insertText(binary)
    }
}

function bintodec(){
    if (verify(inpt.value)) {
        return
    } else {
        let binary = inpt.value.split('').reverse()
        let dec = 0
    
        for (let bit in binary) {
            dec += Math.pow(2, bit) * binary[bit] 
        }
        insertText(dec)
    }
}

let act = 'dectobin'
function action(){
    if (act == 'dectobin') dectobin()
    else if (act == 'bintodec') bintodec()
}

function changeAction(){
    if (act == 'dectobin') {
        act = 'bintodec'
        erase('')
        labelInpt.innerHTML = 'Insert binary number:'
        title.innerHTML = '<span>Convert</span> Binary <span>to</span> Decimal'
        changeButton.innerHTML = '<span>Change conversion</span>: Decimal <span>to</span> Binary'
    } else if (act == 'bintodec') {
        act = 'dectobin'
        erase('')
        labelInpt.innerHTML = 'Insert decimal number:'
        title.innerHTML = '<span>Convert</span> Decimal <span>to</span> Binary'
        changeButton.innerHTML = '<span>Change conversion</span>: Binary <span>to</span> Decimal'
    }
}

function insertText(text){
    let str = text.toString()
    str = str.replaceAll(',', '')
    out.value = str
}

function verify(str){
    if (isNaN(str)) {
        erase('Por favor, insira apenas números!')
        return true
    }
    
    if (act == 'bintodec'){
        let bits = inpt.value.split('')
        for (let bit of bits) {
            if (bit > 1) {
                erase('Por favor, insira apenas zeros(0) e uns(1)!')
                return true
            }
        }
    } 

    return false
}

function erase(text){
    inpt.value = ''
    out.value = ''
    inpt.setAttribute('placeholder', text)
    setTimeout(()=>{
        inpt.setAttribute('placeholder', '')
    }, 5000)
}

function copy(){
    navigator.clipboard.writeText(out.value)
}


function log(str) {
    console.log(str)
}