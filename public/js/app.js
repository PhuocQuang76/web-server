console.log("I am a javascript file.");

//fetch another website

fetch('http://puzzle.mead.io/puzzle').then( (error, response) => {
    if(error){
        console.log(error);

    }else{
        response.json().then( (data) => {
            console.log(data);
        })
    }
});



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = "...Loading....";
messageTwo.textContent='';

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = search.value;




    fetch('/weather?address=' + location).then(( response)=> {
            response.json().then ( (data) => {
                if(data.error){
                    messageOne.textContent = data.error;
                }else{
                    //messageOne.textContent = 'phuoc';
                    messageOne.textContent = data.address;
                    messageTwo.textContent = data.forecast.location ;
                    // console.log(data.forecast);
                    // console.log(data.address);
                }

            })

    });
});