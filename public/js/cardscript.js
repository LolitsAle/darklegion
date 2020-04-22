const form = document.querySelector('form')
const message = document.getElementById('message')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const loaithe = document.querySelector('input[name="card"]:checked')
    const menhgia = document.querySelector('input[name="price"]:checked')
    const seri = document.querySelector('#seri').value
    const mathe = document.getElementById('mathe').value

    if(loaithe == null || menhgia == null || seri == "", mathe == "") {
        message.textContent = "Vui lòng cung cấp đẩy đủ thông tin"
    }else{
        //fetch data from api
        const url = '/trans?card=' + loaithe.value + '&price=' + menhgia.value + '&seri=' + seri + '&code=' + mathe
        fetch(url , { method : 'POST' }).then((response) => {
            response.json().then((data) => {
                console.log(data)
                message.textContent = data.msg
            })
        })
    }  
})