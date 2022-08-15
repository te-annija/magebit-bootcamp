export async function getTaskData(callback) {
    const response = await fetch('http://web.local/todo-api.php?api-name=get-data');
    const response_json = await response.json();
    callback(response_json);
}
