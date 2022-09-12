import axios from "axios";




function response (value, maxResults = 8) {
    const setBook = ''
    axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyCvrncsNO0-RJ8FlQbvTI2jAk5NXtw0-GY&maxResults=${maxResults}`,
    )
    .then((elem) => setBook(elem.data.items))
    .catch((err) => console.log('Произошла ошибка... ' + err));
}