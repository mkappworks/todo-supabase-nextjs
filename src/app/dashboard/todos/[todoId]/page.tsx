import Image from "next/image";

import { getTodoAction } from "@/actions/todos";

import { DeleteDocButton } from "./delete-todo-button";

export default async function TodoPage({
  params,
}: {
  params: {
    todoId: string;
  };
}) {
  const { data, errorMessage } = await getTodoAction({ id: params.todoId });

  return (
    <main className="w-full space-y-8">
      {errorMessage && (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          <Image
            src="/todo.svg"
            width="200"
            height="200"
            alt="image of empty todo list"
          />
          <h2 className="text-2xl">
            Error loading the todo. Please refresh your page!
          </h2>
        </div>
      )}

      {data && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <DeleteDocButton todoId={data.id} />
          </div>

          <div className="flex gap-12">
            <div className="h-[500px] flex-1 rounded-xl">
              {data.description}
            </div>
            <div className="h-[500px] flex-1 rounded-xl">
              {data.createdAt.toString()}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
