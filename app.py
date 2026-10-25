from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Agile Roadmap Simulator API")

class Task(BaseModel):
    id: int
    title: str
    status: str  # 'todo', 'in_progress', 'done'
    sprint: str

tasks_db: List[Task] = [
    Task(id=1, title="Definir Alcance del Proyecto", status="done", sprint="Sprint 1"),
    Task(id=2, title="Diseñar Arquitectura API", status="in_progress", sprint="Sprint 1"),
    Task(id=3, title="Crear Interfaz Kanban", status="todo", sprint="Sprint 2"),
]

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return FileResponse("static/index.html")

@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    return tasks_db

@app.post("/api/tasks", response_model=Task)
def create_task(task: Task):
    tasks_db.append(task)
    return task

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
