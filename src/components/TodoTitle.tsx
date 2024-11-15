// src/components/TodoTitle.tsx
import React, { memo } from "react";

type TodoTitleProps = {
  title: string;
  as: keyof JSX.IntrinsicElements;
};

export const TodoTitle: React.FC<TodoTitleProps> = memo(({ title, as: Tag }) => {
  return <Tag>{title}</Tag>;
});
