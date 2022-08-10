export class Storage{ 
    #db = {
        'id_counter': 1,
        'data': {
        }
    };

    constructor() {
        const temp_data = localStorage.getItem('todolist');
        if (temp_data != null) {
            this.#db = JSON.parse(temp_data);
        }
    }

    getData() {
        return this.#db.data;
    }

    getIdCounter() {
        return this.#db.id_counter;
    }

    add(id, value) {
        this.#db.id_counter++;
        this.#db.data[id] = {
            'text':value, 
            'checked': false,                
            };
        this.save();
    }

    checkDone(id, value){ 
        this.#db.data[id].checked = value;
        this.save();
    }

    update(id, value) { 
        this.#db.data[id].text = value;
        this.save();
    }

    remove(id){ 
        delete this.#db.data[id];
        this.save();
    }

    save() {
        localStorage.setItem('todolist', JSON.stringify(this.#db));
    }
}