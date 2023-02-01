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

function insertText(value){
    let text = value.toString()
    text = text.replaceAll(',', '')
    out.value = text
}

function changeAction(){
    if (act == 'dectobin') {
        act = 'bintodec'
        clearFields()
        labelInpt.innerHTML = 'Insert binary number:'
        title.innerHTML = '<span>Convert</span> Binary <span>to</span> Decimal'
        changeButton.innerHTML = '<span>Change conversion</span>: Decimal <span>to</span> Binary'
    } else if (act == 'bintodec') {
        act = 'dectobin'
        clearFields()
        labelInpt.innerHTML = 'Insert decimal number:'
        title.innerHTML = '<span>Convert</span> Decimal <span>to</span> Binary'
        changeButton.innerHTML = '<span>Change conversion</span>: Binary <span>to</span> Decimal'
    }
    
    clearTimeout(copyTimeout)
    out.setAttribute('placeholder', '')
}

function verify(str){
    if (isNaN(str)) {
        clearFields()
        feedback('Please enter only numbers!', inpt, 5000)
        return true
    }
    
    if (act == 'bintodec'){
        let bits = inpt.value.split('')
        for (let bit of bits) {
            if (bit > 1) {
                clearFields()
                feedback('Please enter only zeros(0) and ones(1)!', inpt, 5000)
                return true
            }
        }
    } 

    return false
}

function clearFields(){
    inpt.value = ''
    out.value = ''
}

function feedback(text, elem, time){
    elem.setAttribute('placeholder', text)
    setTimeout(()=>{
        elem.setAttribute('placeholder', '')
    }, time)
}

let copyTimeout
function copy(){
    let text = out.value
    if (text == '') return

    navigator.clipboard.writeText(text)

    out.value = ''

    feedback('Successfully copied!', out, 3000)

    copyTimeout = setTimeout(() => {
       out.value = text
    }, 3000);
}


function log(str) {
    console.log(str)
}