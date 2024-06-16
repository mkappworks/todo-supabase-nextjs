import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { CreateTodoButton } from "./create-todo-button";
import { TodoCard } from "./todo-card";

export default function TodosPage() {
  let todos = [
    {
      id: "1",
      title: "Todo 1",
      description: "This is the first todo",
    },
  ];

  return (
    <div className="mx-10 my-4">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Todos</h1>
        <CreateTodoButton />
      </div>

      {!todos && (
        <div className="grid grid-cols-3 gap-8">
          {new Array(6).fill("").map((_, i) => (
            <Card
              key={i}
              className="flex h-[200px] flex-col justify-between p-6"
            >
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[20px] rounded" />
              <Skeleton className="h-[40px] w-[80px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {todos && todos.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          <Image
            src="/todo.svg"
            width="200"
            height="200"
            alt="image of empty todo list"
          />
          <h2 className="text-2xl">You have no todos</h2>
          <CreateTodoButton />
        </div>
      )}

      {todos && todos.length > 0 && (
        <div className="grid grid-cols-3 gap-8">
          {todos?.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
