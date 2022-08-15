import { Storage } from "./Storage.js";

export class ToDoList{ 
    constructor(){ 
        this.storage = new Storage();
        this.all_tasks = document.querySelector('.tasks_container');
        this.input_form =  document.querySelector('.input__form'); 

        this.input_form.onsubmit = (event) => { 
            event.preventDefault();
            let input =  document.querySelector('.input_field__task'); 
            if(input.value == '') return;
            let id = this.storage.getIdCounter(); 
            this.storage.add(id, input.value);

            this.#displayTask(id, input.value);
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
            if(checkbox.checked == true){
                this.storage.checkDone(id, true);
                task_text.style.textDecoration = "line-through";
            }
            else{ 
                this.storage.checkDone(id, false);
                task_text.style.textDecoration = "none";
            }
        }
    }

    #deleteTaskListener(task_element){ 
        let id = task_element.dataset.id;
        task_element.querySelector('.task__delete_btn').onclick = (event) => { 
            event.preventDefault();
            this.all_tasks.removeChild(event.target.parentElement);
            this.storage.remove(id);
        }
    }

    #editTaskListener(task_element){ 
        let edit_btn = task_element.querySelector('.task__edit_btn');
        let id = task_element.dataset.id;
        
        edit_btn.onclick = (event) => { 
            let task_text = task_element.querySelector('.task__text').value; 
            event.preventDefault();
            if(edit_btn.classList.contains('task__save_btn')){
                this.storage.update(id, task_text); 
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
        const all_tasks = this.storage.getData();
        for (let id in all_tasks) {
            this.#displayTask(id, all_tasks[id].text, all_tasks[id].checked);
        }
    }
}