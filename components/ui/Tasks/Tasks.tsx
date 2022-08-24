import { useUser } from '@/utils/useUser';
import React from 'react';
import s from './Tasks.module.css';

type Props = {
  tasks: Array<any>;
};

const Tasks = ({ tasks }: Props) => {
  const { user } = useUser();
  return (
    <main className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
      <section>
        <h2>Sub-To-Do</h2>
        <h3>Welcome back {user.user_metadata.user_name}</h3>
        <form>
          <div>
            <label htmlFor=""></label>
            <input type="text" />
          </div>
          <button type="submit">Add task</button>
        </form>
      </section>
      <section>
        <h2>Your list</h2>
        {tasks.length > 0 ? (
          tasks.map((x) => <p key={x.id}>{x.task}</p>)
        ) : (
          <h3>You haven't added any tasks</h3>
        )}
      </section>
    </main>
  );
};

export default Tasks;
