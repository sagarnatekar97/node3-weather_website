console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const massageOne=document.querySelector('#massage1')
const massage=document.querySelector('#m2')
const massageTwo=document.querySelector('#massage2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    massageOne.textContent='loading......'
    massageTwo.textContent=''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error) {

                massageOne.textContent=data.error
                
            } else {
                
                massageOne.textContent=data.cityName
                massage.textContent= data.country
             massageTwo.textContent=data.forcastData

            }
        })
    })
})