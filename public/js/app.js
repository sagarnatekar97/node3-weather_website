

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne=document.querySelector('#massage1')
const massageTwo=document.querySelector('#massage2')

massageOne.textContent='loading......'
massageTwo.textContent=''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {

                massageOne.textContent=data.error
                
            } else {
                
                massageOne.textContent=data.location
                massageTwo.textContent=data.forcastData
            }
        })
    })
})