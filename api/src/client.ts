import axios from 'axios';

const data: Server.DataBody = {
    id: 1,
    name: "my name",
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

axios.post('http://localhost:8080/data', data)
    .then( (res) => {
        const result: Server.DataResponse = res.data;
        console.log(result.status);
    })