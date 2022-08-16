export class ToDoList{ 
    constructor(){ 
        this.all_tasks = document.querySelector('.tasks_container');
        this.input_form =  document.querySelector('.input__form'); 
    
        this.input_form.onsubmit =  (event) => { 
            event.preventDefault();
            this.data = new FormData(this.input_form);
            let input =  document.querySelector('.input_field__task'); 
            if(input.value == '') return;

            fetch('todo-api.php?api-name=add-task', { 
                method: "POST", 
                body: this.data
            }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.#displayTask(data.data.id, data.data.text, false);
            })
            input.value = '';
        }
        this.#fillValues();
    }

    #displayTask(id, text, checked){ 
        let task_template = document.querySelector('.task_template');
        let new_task = this.all_tasks.appendChild(task_template.cloneNode(true));
        new_task.classList.remove('task_template');

        let task_text_elem = new_task.querySelector('.task__text');
        task_text_elem.value = text;

        new_task.querySelector('.task__check').checked = checked;
        checked? task_text_elem.style.textDecoration = "line-through" : task_text_elem.style.textDecoration = "none";

        new_task.dataset.id = id;

        this.#deleteTaskListener(new_task);
        this.#editTaskListener(new_task);
        this.#checkDoneTaskListener(new_task);
    }

    #checkDoneTaskListener(task_element){ 
        let id = task_element.dataset.id;
        let checkbox = task_element.querySelector('.task__check'); 
        let task_text = task_element.querySelector('.task__text');

        checkbox.onchange = (event) => { 
            const checked = checkbox.checked;
            const data = {'id': id, 'checked' : checked};
            checked? task_text.style.textDecoration = "line-through" : task_text.style.textDecoration = "none";

            fetch('todo-api.php?api-name=update', { 
                    method: "POST", 
                    body: JSON.stringify(data),
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
        }
    }

    #deleteTaskListener(task_element){ 
        let id = task_element.dataset.id;
        task_element.querySelector('.task__delete_btn').onclick = (event) => { 
            const data = {'id': id} 
    
            fetch('todo-api.php?api-name=delete', { 
                method: "POST", 
                body: JSON.stringify(data),
            }).then((response) => response.json())
            .then((data) => {
                console.log(data);
            })

            this.all_tasks.removeChild(event.target.parentElement);
            
        }
    }

    #editTaskListener(task_element){ 
        let edit_btn = task_element.querySelector('.task__edit_btn');
        let id = task_element.dataset.id;
        
        edit_btn.onclick = (event) => { 
            let task_text = task_element.querySelector('.task__text').value; 
            let data = {'id': id, 'text': task_text};  
            event.preventDefault();

            if(edit_btn.classList.contains('task__save_btn')){
                fetch('todo-api.php?api-name=update', { 
                    method: "POST", 
                    body: JSON.stringify(data),
                }).then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })

                task_element.querySelector('.task__text').setAttribute('disabled', 'true'); 
                edit_btn.textContent = 'edit';
            }
            else{ 
                task_element.querySelector('.task__text').removeAttribute('disabled'); 
                edit_btn.textContent = 'save';
            }
            
            edit_btn.classList.toggle('task__save_btn');
        }
    }

    #fillValues() {
        fetch('todo-api.php?api-name=get-data')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            for (let id in data.data) {
                let task = data.data[id];
                this.#displayTask(task.id, task.text, task.checked)
            }
        }
        
        );
        
    }

}