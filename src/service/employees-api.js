function fetchEmployess() {
  return fetch(
    "https://yalantis-react-school-api.yalantis.com/api/task0/users"
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
}

export default fetchEmployess;
