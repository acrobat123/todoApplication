import { Component } from "react";
import withRouter from "../Wraper"

import "./index.css"


const TodoElements = props =>{
    const {eachTodo,callBackFn} = props
    const {todo,status} = eachTodo

    const onClickDelete = () =>{
        const id = eachTodo.id
        const options = {
            method : "DELETE",
            headers:{
                headers:{
                    "Content-Type":"application/json",
                },
            }
            
        }
        const deleteTodo = fetch(`/delete/${id}`,options)
        callBackFn()

        
    }
    const onClickUpdate = props =>{
        const {eachTodo,callBackFn} = props
        const {todo,status} = eachTodo 
    }

    return (
       <div className="todo-con">
        <div>
        <p className="para"><span className="pp">Task: </span>{todo}</p>
        <p className="para"><span className="pp">Status: </span>{status}</p>
        </div>
        <div>
            <button onClick={onClickUpdate} className="button btn-a">Edit</button>
            <button onClick={onClickDelete} className="button btn-a">Delete</button>
        </div>
    </div>)
}

class Todo extends Component{
    state = {
        task:"",
        statusA:"",
        data:[]
    }

    getData = async()=>{
        const options = {
method:"GET"
}
const response = await fetch("/getTodosList",options)
const data = await response.json()
this.setState({data:data})
    }
componentDidMount(){
    this.getData()

}

    onClickBtn =async e=>{
        const {task,statusA} = this.state
        if (task !== "" && statusA  !== ""){
            
            const tasktodo = {task,statusA}
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(tasktodo),
            }
            const response= await fetch("/addtask",options)
        }
        this.getData()
        this.setState({task:"",statusA:""})
    }
    onAddTask = e=>{
        this.setState({task:e.target.value,statusA:"pending"})
    }

    render(){
        const {task,statusA,data} = this.state
        return <div class="todos-bg-container">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="todos-heading">Todos</h1>
                    <h1 className="create-task-heading">
                        Create <span class="create-task-heading-subpart">Task</span>
                    </h1>
                    <input value={task} onChange={this.onAddTask} type="text" id="todoUserInput" class="todo-user-input" placeholder="What is your task?" />
                    <button onClick={this.onClickBtn} className="button" id="addTodoButton">Add</button>
                    <h1 className="todo-items-heading">
                        My <span class="todo-items-heading-subpart">Tasks</span>
                    </h1>
                    <ul className="todo-items-container" id="todoItemsContainer">
                        {data.map(each=>(
                            <TodoElements callBackFn = {this.getData} eachTodo = {each} key = {each.id}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    }
}


export default withRouter(Todo)